import React from "react";
import { List, ListItem } from "react95";

import img from "../img/air-host.png";

import styled from "styled-components";

function Weblinks() {
  return (
    <WeblinksContainer>
      <h1>Weblinks</h1>
      <List inline>
        <a
          href="https://hubs.ninaprotocol.com/corporationplaza"
          target="_blank"
          rel="noreferrer"
        >
          <StyledListItem>Nina Hub</StyledListItem>
        </a>
        <a href="https://twitter.com/CorpPlaz" target="_blank" rel="noreferrer">
          <StyledListItem>Twitter</StyledListItem>
        </a>
        <a
          href="https://corporationplaza.bandcamp.com/music"
          target="_blank"
          rel="noreferrer"
        >
          <StyledListItem>Web 2.0</StyledListItem>
        </a>
      </List>
      <div>
        <a href="https://react95.io/" target="_blank" rel="noreferrer">
          made with react95
        </a>
      </div>
    </WeblinksContainer>
  );
}

const WeblinksContainer = styled.div`
  padding: 20px;
  background-image: url(${img});
  padding-bottom: 100px;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
`;

export default Weblinks;
