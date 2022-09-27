import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, TokenAccountsFilter } from "@solana/web3.js";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import img from "../img/air-host.png";

import styled from "styled-components";

function Connect() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [hasCorpTokens, setHasCorpTokens] = useState(false);

  const getResult = async (publicKey: PublicKey) => {
    const corpTokens = [
      "GBGLvZDqRGMviomCvvrq2eyMQX49XrA6WXEB6qmqQF36",
      "4GyqVhY2fEWSFmHxkUDwVbacWcAYYqpuHqMDBQLcjJ5R",
      "HCPECyL9rySiNHaFNeBermwv9WhDedaChtvEFn2BHFvf",
    ];
    const filters: TokenAccountsFilter[] = corpTokens.map((token) => {
      return {
        mint: new PublicKey(token),
      };
    });

    return await Promise.all(
      filters.map((filter) => {
        return connection.getTokenAccountsByOwner(publicKey, filter);
      })
    );
  };

  useEffect(() => {
    if (publicKey) {
      getResult(publicKey).then((res) => {
        return setHasCorpTokens(
          res.some((tokenResult) => tokenResult.value.length > 0)
        );
      });
    }
    // eslint-disable-next-line
  }, [publicKey]);

  return (
    <ConnectContainer>
      <VStack>
        <StyledH1>Corporation Plaza e-business lounge</StyledH1>
        {!publicKey ? (
          <div>Welcome, please connect wallet to enable business</div>
        ) : hasCorpTokens ? (
          <div>Were in business</div>
        ) : (
          <div>Were not in business</div>
        )}
      </VStack>
      <ConnectButtons>
        <WalletMultiButton style={{ backgroundColor: "blue" }} />
        <WalletDisconnectButton />
      </ConnectButtons>
    </ConnectContainer>
  );
}

const ConnectContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  background-image: url(${img});
`;

const ConnectButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledH1 = styled.h1`
  margin-bottom: 0;
`;

export default Connect;
