import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AppBar, Button, Progress } from "react95";

import { Track } from "./nina";

const PlayerContext = React.createContext(null);

function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [playing, setPlaying] = useState(false);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);
  const audioPollRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (currentTrack) {
      setSeek(0);
      playerRef.current.play();
      setPlaying(true);
      pollAudioData();
    }
  }, [currentTrack]);

  const pollAudioData = () => {
    // Clear any timers already running
    clearInterval(audioPollRef.current);

    audioPollRef.current = setInterval(() => {
      setSeek(playerRef.current.currentTime);
      setDuration(playerRef.current.duration);
    }, 30);
  };

  const value = { currentTrack, setCurrentTrack, playing };
  return (
    <PlayerContext.Provider value={value}>
      {children}
      {currentTrack && (
        <audio src={currentTrack?.metadata?.animation_url} ref={playerRef} />
      )}
      <PlayerContainer>
        <TrackTitle>{currentTrack?.metadata?.properties?.title}</TrackTitle>

        <Button
          onClick={() => {
            const newSeek = seek - 10;
            playerRef.current.currentTime = newSeek;
            setSeek(newSeek);
          }}
        >
          ⏪
        </Button>

        <Button
          onClick={() => {
            if (playing) {
              playerRef?.current?.pause();
            } else {
              playerRef?.current?.play();
            }
            setPlaying(!playing);
          }}
        >
          {playing ? "⏸️" : "▶️"}
        </Button>
        <Button
          onClick={() => {
            const newSeek = seek + 10;
            playerRef.current.currentTime = newSeek;
            setSeek(newSeek);
          }}
        >
          ⏩
        </Button>
        <StyledProgress
          value={duration ? ((seek / duration) * 100).toFixed(1) : 0}
        />
      </PlayerContainer>
    </PlayerContext.Provider>
  );
}

const PlayerContainer = styled(AppBar)`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  position: fixed;
  padding: 10px;
  bottom: 0;
  top: unset;
`;

const TrackTitle = styled.h3`
  margin: 0;
  width: 300px;
`;

const StyledProgress = styled(Progress)`
  max-width: 50%;
`;

function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}

export { PlayerProvider, usePlayer };
