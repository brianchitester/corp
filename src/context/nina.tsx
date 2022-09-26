import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

const NinaContext = React.createContext(null);

function NinaProvider({ children }) {
  const [tracks, setTracks] = useState([]);
  const [collectors, setCollectors] = useState([]);

  const fetchTracks = async () => {
    const publicKey = "5rcTDpRnmQrnRmCQbNdCRF1SGAfjRLkwGuG6zUgALDjS";
    const resp = await fetch(
      `https://api.ninaprotocol.com/v1/accounts/${publicKey}/published`
    );
    const tracks = await resp.json();
    console.log(tracks);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const value = { tracks, collectors };
  return <NinaContext.Provider value={value}>{children}</NinaContext.Provider>;
}

export { NinaProvider };
