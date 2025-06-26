import { StartStream } from "@/services/api/stream/post/StartStream";
import { StopStream } from "@/services/api/stream/post/StopStream";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Toggle } from "react-daisyui";
import { toast } from "react-toastify";

export default function ToggleStream({
  status,
  path_slug,
  rtsp,
  type,
}: Readonly<{
  status: boolean;
  path_slug: string;
  rtsp: string;
  type: 2 | 3;
}>) {
  const [checked, setChecked] = useState(status);

  const startStream = useMutation({
    mutationFn: StartStream,
    onSuccess: () => {
      toast.success("Stream started successfully");
      setChecked(true);
    },
    onError: () => {
      toast.error("Failed to start stream");
      setChecked(false);
    },
  });

  const stopStream = useMutation({
    mutationFn: StopStream,
    onSuccess: () => {
      toast.success("Stream stopped successfully");
      setChecked(false);
    },
    onError: () => {
      toast.error("Failed to stop stream");
    },
  });

  const handleClick = () => {
    if (startStream.isLoading || stopStream.isLoading) return;

    if (checked) {
      stopStream.mutate({
        pathSlug: path_slug,
        type: type,
      });
    } else {
      startStream.mutate({
        pathSlug: path_slug,
        rtspUrl: rtsp,
        type: type,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Toggle
        className="border-0"
        checked={checked}
        onChange={handleClick}
        disabled={startStream.isLoading || stopStream.isLoading}
      />
    </div>
  );
}
