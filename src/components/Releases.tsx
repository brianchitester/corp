import React from "react";
import { useNina } from "../context/nina";

import img from "../img/air-host.png";

import styled from "styled-components";

function Releases() {
  const { tracks } = useNina();
  return (
    <ReleasesContainer>
      <h1>Releases</h1>
      <TracksContainer>
        {tracks?.map((track) => {
          return <Cover src={track.metadata.image} />;
        })}
      </TracksContainer>
    </ReleasesContainer>
  );
}

const ReleasesContainer = styled.div`
  padding: 20px;
  background-image: url(${img});
`;

const TracksContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Cover = styled.img`
  width: 250px;
  height: 250px;
`;

export default Releases;
