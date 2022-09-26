import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

const NinaContext = React.createContext(null);

function NinaProvider({ children }) {
  const [tracks, setTracks] = useState<any[]>();
  const [investorMap, setInvestorMap] = useState<any[]>();

  const fetchTracks = async () => {
    const publicKey = "5rcTDpRnmQrnRmCQbNdCRF1SGAfjRLkwGuG6zUgALDjS";
    const resp = await fetch(
      `https://api.ninaprotocol.com/v1/accounts/${publicKey}/published`
    );
    const tracks = await resp.json();

    setTracks(tracks.published);
    return tracks.published;
  };

  const fetchTrackInvestors = async (trackId) => {
    const resp = await fetch(
      `https://api.ninaprotocol.com/v1/releases/${trackId}/collectors`
    );
    const investor = await resp.json();
    if (!investor?.collectors) {
      console.error("something broke");
      return;
    }
    return {
      trackId,
      collectors: investor.collectors.map((collector) => collector.publicKey),
    };
  };

  const getInvestorMap = async (tracks) => {
    const investorMap = await Promise.all(
      tracks.map((track) => fetchTrackInvestors(track.publicKey))
    );
    setInvestorMap(investorMap);
  };

  useEffect(() => {
    if (!tracks) {
      fetchTracks();
    } else {
      getInvestorMap(tracks);
    }
  }, [tracks]);

  const allCollectors = investorMap?.reduce((accum, track) => {
    return [...new Set([...track.collectors, ...accum])];
  }, []);

  const boardOfDirectors = allCollectors?.reduce((accum, collector) => {
    const pass = investorMap.reduce((accum, track) => {
      return track.collectors.includes(collector) && accum;
    }, true);
    console.log(pass);

    if (pass) {
      return [collector, ...accum];
    }
    return accum;
  }, []);

  const ownerMap = allCollectors?.reduce((accum, collector) => {
    const hasTracks = investorMap.map((track) => {
      return track.collectors.includes(collector);
    });

    const numberOwned = hasTracks.reduce((accum, has) => {
      if (has) {
        return accum + 1;
      }
      return accum;
    }, 0);

    return [{ collector, numberOwned }, ...accum];
  }, []);

  ownerMap.sort((a, b) => {
    return b.numberOwned - a.numberOwned;
  });
  console.log(boardOfDirectors);
  console.log(ownerMap);

  const value = { tracks, investorMap };
  return <NinaContext.Provider value={value}>{children}</NinaContext.Provider>;
}

export { NinaProvider };
