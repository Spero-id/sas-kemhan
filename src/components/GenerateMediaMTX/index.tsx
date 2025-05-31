"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PostGenerateMediaMTX } from "@/services/api/generateMediaMTX/post/PostGenerateMediaMTX";

export default function ButtonGenerateMediaMTX() {
  const postGenerate = useMutation({
    mutationFn: PostGenerateMediaMTX,
    onSuccess() {
      toast.success("Berhasil digenerate!");
    },
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const onClickGenerate = () => {
    postGenerate.mutate();
  };

  return (
    <button
      onClick={onClickGenerate}
      className="btn"
      disabled={postGenerate.isLoading}
    >
      {postGenerate.isLoading ? "Loading..." : "Regenerate MediaMTX"}
    </button>
  );
}
