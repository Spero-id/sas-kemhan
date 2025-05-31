import { StartStream } from "@/services/api/stream/post/StartStream";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import HLSPlayer from "../HLSPlayer";

export default function RTSPCamera({pathSlug, rtspUrl, outputPath}: Readonly<{pathSlug: string, rtspUrl: string, outputPath: string}>) {
  const startSteamCctv = useMutation({
    mutationFn: StartStream,
    onError() {
      console.log("error");
    },
  });

  useEffect(() => {
    startSteamCctv.mutate({
      pathSlug: pathSlug,
      rtspUrl: rtspUrl,
      outputPath: outputPath,
    }, {
      onSuccess() {
        console.log("success");
      },
      onError() {
        console.log("error");
      },
    });
  }, []);

  return <HLSPlayer src={`stream/${pathSlug}/out.m3u8`}/>;
}
