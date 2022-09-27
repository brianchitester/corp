import React, { useState } from "react";
import { useNina } from "../context/nina";
import { Window, Fieldset, Button, WindowHeader, WindowContent } from "react95";

import img from "../img/air-host.png";

import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";

function Investors() {
  const { bucketedOwners, tracks, investorMap } = useNina();
  const { publicKey } = useWallet();

  const [modalTracks, setModalTracks] = useState([]);

  const getLevelText = (level) => {
    switch (level - tracks?.length) {
      case 0:
        return "Board of Directors";
      case -1:
        return "Executive Board";
      case -2:
        return "Advisory Board";
      default:
        return `Retail Investors (Tier ${level})`;
    }
  };

  return (
    <>
      <InvestorsContainer>
        <h1>Investors</h1>
        <LevelsContainer>
          {Object.keys(bucketedOwners).map((level) => {
            const ownerList = bucketedOwners[level];
            if (!ownerList?.length) {
              return null;
            }
            return (
              <LevelContainer key={level} label={getLevelText(level)}>
                <ul>
                  {ownerList.map((owner) => {
                    const isConnected = publicKey?.toString() === owner;
                    const ownedTrackIds = investorMap
                      ?.filter((inv) => inv.collectors.includes(owner))
                      ?.map((inv) => inv.trackId);

                    const ownedTracks = tracks
                      .filter((track) =>
                        ownedTrackIds.includes(track.publicKey)
                      )
                      .map((track) => track.metadata.properties.title);

                    return (
                      <Owner
                        key={owner}
                        onClick={() => setModalTracks(ownedTracks)}
                      >
                        {isConnected && "⭐"}
                        {`${owner.slice(0, 4)}...${owner.slice(
                          owner.length - 4,
                          owner.length
                        )}`}
                        {isConnected && "⭐"}
                      </Owner>
                    );
                  })}
                </ul>
              </LevelContainer>
            );
          })}
        </LevelsContainer>
      </InvestorsContainer>
      {modalTracks && modalTracks.length > 0 && (
        <Modal>
          <StyledHeader>
            <span>Shares owned</span>
            <Button onClick={() => setModalTracks([])}>X</Button>
          </StyledHeader>
          <WindowContent>
            {modalTracks.map((track) => (
              <div key={track}>{track}</div>
            ))}
          </WindowContent>
        </Modal>
      )}
    </>
  );
}

const InvestorsContainer = styled.div`
  padding: 20px;
  background-image: url(${img});
`;

const LevelsContainer = styled(Window)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  flex-wrap: wrap-reverse;
  padding: 20px;
  gap: 20px;
`;

const LevelContainer = styled(Fieldset)`
  flex-grow: 1;
  min-width: 250px;
`;

const Modal = styled(Window)`
  position: fixed;
  top: 30%;
  left: 0;
  right: 0;
  width: 200px;
  margin: auto;
  z-index: 2;
`;

const StyledHeader = styled(WindowHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Owner = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;

export default Investors;
