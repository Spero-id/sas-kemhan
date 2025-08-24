import { PostStar } from "@/services/api/stream/post/Star";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function StarStream({
  type,
  path_slug,
  star,
  is_detail,
}: Readonly<{ type: 1 | 2 | 3; path_slug: string; star: boolean; is_detail: boolean }>) {
  const [statusStar, setStatusStar] = useState(star);

  // Sync statusStar with prop 'star' when it changes
  useEffect(() => {
    setStatusStar(star);
  }, [star]);

  const postStar = useMutation({
    mutationFn: PostStar,
    onSuccess: () => {
      if (!is_detail) {
        setStatusStar(!statusStar);
      }

      toast.success("Berhasil diupdate!");
    },
    onError: (e: any) => {
      toast.error(e.message);
    },
  });

  const handleClick = () => {
    postStar.mutate({
      type: type,
      pathSlug: path_slug,
      status: !statusStar,
    });
  };

  const getButtonLabel = () => {
    return (
      <FaStar className={statusStar ? "text-yellow-500" : "text-white"} />
    );
  };

  return (
    <button
      onClick={handleClick}
      className="p-1 rounded cursor-pointer pointer-events-auto flex items-center justify-center"
    >
      {getButtonLabel()}
    </button>
  );
}
