import React from "react";
import { useNina } from "../context/nina";
import { Window, WindowContent, WindowHeader, Button } from "react95";

import img from "../img/air-host.png";

import styled from "styled-components";

function Releases() {
  const { tracks } = useNina();
  console.log(tracks);
  return (
    <ReleasesContainer>
      <h1>Releases</h1>
      <TracksContainer>
        {tracks?.map((track) => {
          return (
            <StyledWindow>
              <WindowHeader>
                <span>{track.metadata.symbol}</span>
              </WindowHeader>
              <Cover src={track.metadata.image} />
              <WindowContent>
                <StyledH2>{track.metadata.properties.title}</StyledH2>
                <StyledP>{track.metadata.description}</StyledP>
                <HStack>
                  <Button>▶️</Button>
                  <Button
                    onClick={() =>
                      window.location.assign(track.metadata.external_url)
                    }
                  >
                    🛒
                  </Button>
                </HStack>
              </WindowContent>
            </StyledWindow>
          );
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
  gap: 30px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Cover = styled.img`
  max-width: 100%;
`;

const StyledWindow = styled(Window)`
  width: 300px;
`;

const StyledH2 = styled.h2`
  margin-top: 0px;
  margin-bottom: 0.5em;
`;

const StyledP = styled.p`
  margin-top: 0px;
`;

const HStack = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Releases;
