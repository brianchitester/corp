import React from "react";
import { useNina } from "../context/nina";
import { Window, Fieldset } from "react95";

import img from "../img/air-host.png";

import styled from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";

function Investors() {
  const { bucketedOwners, tracks } = useNina();
  const { publicKey } = useWallet();

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
                  return (
                    <div key={owner}>
                      {isConnected && "⭐"}
                      {`${owner.slice(0, 4)}...${owner.slice(
                        owner.length - 4,
                        owner.length
                      )}`}
                      {isConnected && "⭐"}
                    </div>
                  );
                })}
              </ul>
            </LevelContainer>
          );
        })}
      </LevelsContainer>
    </InvestorsContainer>
  );
}

const InvestorsContainer = styled.div`
  padding: 20px;
  background-image: url(${img});
  padding-bottom: 100px;
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
  min-width: 300px;
`;

export default Investors;
