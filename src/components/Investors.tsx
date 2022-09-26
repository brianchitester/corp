import React from "react";
import { useNina } from "../context/nina";

import img from "../img/air-host.png";

import styled from "styled-components";

function Investors() {
  const { bucketedOwners } = useNina();

  return (
    <InvestorsContainer>
      <h1>Investors</h1>
      <LevelsContainer>
        {Object.keys(bucketedOwners).map((level) => {
          const ownerList = bucketedOwners[level];
          console.log(bucketedOwners);
          if (!ownerList?.length) {
            return;
          }
          return (
            <LevelContainer>
              <h2>{level}</h2>
              <ul>
                {ownerList.map((owner) => (
                  <div>{owner}</div>
                ))}
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
`;

const LevelsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export default Investors;
