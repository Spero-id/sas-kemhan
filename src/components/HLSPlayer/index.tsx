"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
}

const HLSPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;

    if (videoRef.current) {
      if (Hls.isSupported()) {
        hls = new Hls({
          maxBufferLength: 30,
          maxMaxBufferLength: 60,
          liveSyncDuration: 6,
          liveMaxLatencyDuration: 20,
        });
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      className="w-full h-full object-cover z-1 absolute"
    />
  );
};

export default HLSPlayer;
