"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PostGenerateMediaMTX } from "@/services/api/generateMediaMTX/post/PostGenerateMediaMTX";
import { useDetailSettings } from "@/services/api/settings/get/get.hooks";

export default function ButtonGenerateMediaMTX() {
  const postGenerate = useMutation({
    mutationFn: PostGenerateMediaMTX,
    onSuccess() {
      toast.success("Berhasil digenerate!");
      refetch();
    },
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const { data, isLoading, refetch } = useDetailSettings({
    name: "regenerate_mediamtx",
  });

  const onClickGenerate = () => {
    postGenerate.mutate();
  };

  return !isLoading && (
    <button
      onClick={onClickGenerate}
      className={`btn ${data?.data?.value == 'false' && "btn-warning"}`}
      disabled={postGenerate.isLoading}
    >
      {postGenerate.isLoading ? "Loading..." : "Regenerate MediaMTX"}
    </button>
  );
}
