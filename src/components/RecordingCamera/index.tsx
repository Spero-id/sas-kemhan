import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StartRecord } from "@/services/api/stream/post/StartRecord";
import { StopRecord } from "@/services/api/stream/post/StopRecord";
import { FaStopCircle, FaSpinner } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import { toast } from "react-toastify";

type RecordStatus = "none" | "on" | "off";

export default function RecordingCamera({
  pathSlug,
  rtspUrl,
}: Readonly<{ pathSlug: string; rtspUrl: string; }>) {
  const [statusRecord, setStatusRecord] = useState<RecordStatus>("none");
  const [isRecording, setIsRecording] = useState(false);

  const startRecord = useMutation({
    mutationFn: StartRecord,
    onSuccess: () => {
      setIsRecording(true);
      toast.success("Start recording success");
    },
    onError: () => {
      setStatusRecord("none");
      toast.error("Start recording error");
    },
  });

  const stopRecord = useMutation({
    mutationFn: StopRecord,
    onSuccess: () => {
      setStatusRecord("none");
      setIsRecording(false);
      toast.success("Stop recording success");
    },
    onError: () => {
      toast.error("Stop recording error");
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
    if (startRecord.isLoading || stopRecord.isLoading) return <FaSpinner className="animate-spin text-yellow-500" />;
    if (statusRecord === "none") return <AiFillVideoCamera className="text-white" />;
    return <FaStopCircle className="text-red-600" />;
  };

  return (
    <button onClick={handleClick} disabled={startRecord.isLoading || stopRecord.isLoading} className="p-1 rounded cursor-pointer pointer-events-auto flex items-center justify-center">
      {getButtonLabel()}
    </button>
  );
}
