import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StartRecord } from "@/services/api/stream/post/StartRecord";
import { StopRecord } from "@/services/api/stream/post/StopRecord";

type RecordStatus = "none" | "on" | "off";

export default function RecordingCamera({
  pathSlug,
  rtspUrl,
  outputPath,
}: Readonly<{ pathSlug: string; rtspUrl: string; outputPath: string }>) {
  const [statusRecord, setStatusRecord] = useState<RecordStatus>("none");
  const [isRecording, setIsRecording] = useState(false);

  const startRecord = useMutation({
    mutationFn: StartRecord,
    onSuccess: () => {
      console.log("Start recording success");
      setIsRecording(true);
    },
    onError: () => {
      console.log("Start recording error");
      setStatusRecord("none");
    },
  });

  const stopRecord = useMutation({
    mutationFn: StopRecord,
    onSuccess: () => {
      console.log("Stop recording success");
      setStatusRecord("none");
      setIsRecording(false);
    },
    onError: () => {
      console.log("Stop recording error");
    },
  });

  useEffect(() => {
    if (statusRecord === "on" && !isRecording && !startRecord.isLoading) {
      startRecord.mutate({
        pathSlug,
        rtspUrl,
      });
    } else if (statusRecord === "off" && isRecording && !stopRecord.isLoading) {
      stopRecord.mutate({
        pathSlug,
      });
    }
  }, [statusRecord]);

  const handleClick = () => {
    if (startRecord.isLoading || stopRecord.isLoading) return;

    if (statusRecord === "none") {
      setStatusRecord("on");
    } else if (statusRecord === "on") {
      setStatusRecord("off");
    }
  };

  const getButtonLabel = () => {
    if (startRecord.isLoading || stopRecord.isLoading) return "Processing...";
    if (statusRecord === "none") return "Start Recording";
    return "Stop Recording";
  };

  return (
    <button onClick={handleClick} disabled={startRecord.isLoading || stopRecord.isLoading}>
      {getButtonLabel()}
    </button>
  );
}
