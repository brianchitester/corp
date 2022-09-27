import * as React from "react";
import { useEffect, useState } from "react";

const NinaContext = React.createContext<Nina>(null);

type Nina = {
  tracks?: Track[];
  ownerMap?: any;
  bucketedOwners?: any;
};

type Track = {
  datetime: Date;
  metadata: TrackMetadata;
  mint: string;
  publicKey: string;
  publisher: string;
};

type TrackMetadata = {
  animation_url: string; // audio url
  attributes: any[];
  collection: any;
  description: string;
  external_url: string;
  image: string;
  name: string; // "Corporation Plaza - Recharge Week"
  properties: TrackProperties;
  seller_fee_basis_points: string;
  symbol: string; // "CORP001"
};

type TrackProperties = {
  artist: string; // "Corporation Plaza"
  category: string; //"audio"
  creators: any;
  date: Date;
  files: any;
  title: string; //"Recharge Week"
};

function NinaProvider({ children }) {
  const [tracks, setTracks] = useState<Track[]>();
  const [investorMap, setInvestorMap] = useState<any[]>();

  const fetchTracks = async () => {
    const publicKey = "5rcTDpRnmQrnRmCQbNdCRF1SGAfjRLkwGuG6zUgALDjS";
    const resp = await fetch(
      `https://api.ninaprotocol.com/v1/accounts/${publicKey}/published`
    );
    const tracks = await resp.json();

    const publishedTracks = tracks.published as Track[];

    publishedTracks.sort((a, b) => {
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });

    setTracks(publishedTracks);
    return publishedTracks;
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

  const totalTracks = tracks?.length;
  const bucketedOwners = {};
  for (let i = 1; i <= totalTracks; i++) {
    bucketedOwners[i] = ownerMap
      ?.filter((owner) => owner.numberOwned === i)
      .map((owner) => owner.collector);
  }

  const value = { tracks, ownerMap, bucketedOwners };
  return <NinaContext.Provider value={value}>{children}</NinaContext.Provider>;
}

function useNina() {
  const context = React.useContext(NinaContext);
  if (context === undefined) {
    throw new Error("useNina must be used within a NinaProvider");
  }
  return context;
}

export { NinaProvider, useNina };
