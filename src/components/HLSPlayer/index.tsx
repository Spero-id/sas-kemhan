// components/HLSPlayer.tsx
"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Props {
  src: string;
}

const HLSPlayer = ({ src }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      className="w-full max-w-xl rounded-lg shadow-lg absolute"
    />
  );
};

export default HLSPlayer;
