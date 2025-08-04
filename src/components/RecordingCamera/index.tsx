// components/RecordingCamera.tsx
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StartRecord } from "@/services/api/stream/post/StartRecord";
import { StopRecord } from "@/services/api/stream/post/StopRecord";
import { FaStopCircle, FaSpinner } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { activeRecordingsAtom } from "@/common/module/SettingsJotai";

type RecordStatus = "none" | "on" | "off";

// Fungsi untuk generate suffix acak
const generateRandomSuffix = () => Math.floor(1000 + Math.random() * 9000);

export default function RecordingCamera({
  pathSlug,
  rtspUrl,
}: Readonly<{ pathSlug: string; rtspUrl: string }>) {
  const [recordState, setRecordState] = useState<RecordStatus>("none");
  const [activeRecordings, setActiveRecordings] = useAtom(activeRecordingsAtom);

  const recordingInfo = activeRecordings[pathSlug];
  const isRecording = !!recordingInfo?.status;

  const startRecord = useMutation({
    mutationFn: StartRecord,
    onSuccess: (res) => {
      setActiveRecordings((prev) => ({
        ...prev,
        [pathSlug]: {
          status: true,
          name: res.data.uniqueName,
        },
      }));
      toast.success(`Start recording success`);
    },
    onError: () => {
      setRecordState("none");
      toast.error("Start recording error");
    },
  });

  const stopRecord = useMutation({
    mutationFn: StopRecord,
    onSuccess: () => {
      setActiveRecordings((prev) => ({
        ...prev,
        [pathSlug]: {
          status: false,
          name: '',
        },
      }));
      setRecordState("none");
      toast.success("Stop recording success");
    },
    onError: () => {
      toast.error("Stop recording error");
    },
  });

  // Sinkronisasi recordState dengan isRecording
  useEffect(() => {
    if (isRecording) {
      setRecordState("on");
    } else {
      setRecordState("none");
    }
  }, [isRecording]);

  useEffect(() => {
    if (recordState === "on" && !isRecording && !startRecord.isLoading) {
      const generateName = `${pathSlug}-${generateRandomSuffix()}`;
      startRecord.mutate({ pathSlug, rtspUrl, uniqueName: generateName });
    } else if (recordState === "off" && isRecording && !stopRecord.isLoading) {
      const uniqName = activeRecordings[pathSlug]['name'];
      stopRecord.mutate({ pathSlug, uniqueName: uniqName });
    }
  }, [recordState]);

  const handleClick = () => {
    if (startRecord.isLoading || stopRecord.isLoading) return;

    if (recordState === "none") {
      setRecordState("on");
    } else if (recordState === "on") {
      setRecordState("off");
    }
  };

  const getButtonLabel = () => {
    if (startRecord.isLoading || stopRecord.isLoading)
      return <FaSpinner className="animate-spin text-yellow-500" />;
    if (recordState === "none") return <AiFillVideoCamera className="text-white" />;
    return <FaStopCircle className="text-red-600" />;
  };

  return (
    <button
      onClick={handleClick}
      disabled={startRecord.isLoading || stopRecord.isLoading}
      className="p-1 rounded cursor-pointer pointer-events-auto flex items-center justify-center"
    >
      {getButtonLabel()}
    </button>
  );
}