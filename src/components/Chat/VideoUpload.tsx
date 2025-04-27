import { PostUploadVideoFunction } from "@/services/api/chat/post/PostUploadVideoFunction";
import { useMutation } from "@tanstack/react-query";
import { MdVideoCall } from "react-icons/md";
import { toast } from "react-toastify";

export default function VideoUpload() {
  const postVideo = useMutation({
    mutationFn: PostUploadVideoFunction,
    onError() {
      toast.error("Telah terjadi kesalahan!");
    },
  });

  const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      alert("Video terlalu besar, maksimal 10MB.");
      return;
    }

    postVideo.mutate({
      file: file
    }, {
      onSuccess() {
        console.log('Video berhasil dikirim');
      },
      onError() {
        toast.error("Telah terjadi kesalahan!");
      },
    });
  };

  return (
    <label className="cursor-pointer p-2 box-border">
      <MdVideoCall className="text-white text-xl" />
      <input
        type="file"
        accept="video/*"
        onChange={handleUploadVideo}
        className="hidden"
      />
    </label>
  );
}
