import {
  CollectionSortKey,
  MediaType,
  SortDirection,
  TokensQuery,
} from "@zoralabs/zdk/dist/queries/queries-sdk";
import React, { useState } from "react";
import { useZora } from "../hooks/useZora";

const ipfsToHTTPS = (cid: string): string => {
  //zora is stored on their api
  return cid.includes("ipfs://")
    ? cid.replace("ipfs://", "https://ipfs.io/ipfs/")
    : cid;
};

function ZoraTest() {
  const { zdk } = useZora();
  const [tokens, setTokens] = useState<TokensQuery>(null);

  const getTokens = async () => {
    const args = {
      where: {
        collectionAddresses: [
          "0x0bC2A24ce568DAd89691116d5B34DEB6C203F342", // catalog
          "0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7", // zora
        ],
      },
      filter: {
        mediaType: MediaType.Audio,
      },
      includeFullDetails: false,
      pagination: { limit: 500 },
    };

    const response = await zdk.tokens(args);

    setTokens(response);
  };
  if (!tokens) {
    getTokens();
  }
  console.log(JSON.stringify(tokens));

  const songs = tokens?.tokens?.nodes.map((node) => {
    const name = node?.token?.name?.split(" - ");
    if (name.length < 2) {
      console.log(node?.token.name);
      console.log(JSON.stringify(node?.token?.metadata));
    }

    const artist = name && name.length > 2 ? name[0] : "";
    const track = name && name.length > 2 ? name[1] : "";
    return {
      artist,
      track,
      description: node.token.description,
      imageUrl: ipfsToHTTPS(node?.token?.image?.url || ""),
      wavUrl: ipfsToHTTPS(node?.token?.content?.url || ""),
      owner: node.token.owner,
      meta: node?.token?.metadata,
    };
  });
  //.filter((song) => !!song.artist);

  return (
    <div>
      <div>Zora Test</div>
      {songs?.map((song) => {
        return (
          <>
            <div>{song.artist}</div>
            <div>{song.track}</div>
            <div>{song.description}</div>
            <img src={song.imageUrl} alt={song.description} width={100} />
            <audio controls src={song.wavUrl}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </>
        );
      })}
    </div>
  );
}

export default ZoraTest;
