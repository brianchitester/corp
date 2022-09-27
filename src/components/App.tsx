import React from "react";
import { Wallet } from "./Wallet";
import { ThemeProvider } from "styled-components";

import original from "react95/dist/themes/original";

function App() {
  return (
    <ThemeProvider theme={original}>
      <div>
        <Wallet />
      </div>
    </ThemeProvider>
  );
}

export default App;
