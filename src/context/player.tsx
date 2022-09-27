import * as React from "react";
import { useEffect, useState } from "react";

const PlayerContext = React.createContext(null);

function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState<any[]>();

  const value = { currentTrack };
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export { PlayerProvider };
