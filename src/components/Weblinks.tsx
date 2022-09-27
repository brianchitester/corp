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
          <ListItem>Nina Hub</ListItem>
        </a>
        <a href="https://twitter.com/CorpPlaz" target="_blank" rel="noreferrer">
          <ListItem>Twitter</ListItem>
        </a>
        <a
          href="https://corporationplaza.bandcamp.com/music"
          target="_blank"
          rel="noreferrer"
        >
          <ListItem>Web 2.0</ListItem>
        </a>
      </List>
    </WeblinksContainer>
  );
}

const WeblinksContainer = styled.div`
  padding: 20px;
  background-image: url(${img});
  padding-bottom: 100px;
`;

export default Weblinks;
