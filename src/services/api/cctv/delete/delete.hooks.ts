import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCctv } from "./delete.service";

export const useDeleteCctv = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCctv,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-cctv"]);
      queryClient.invalidateQueries(["detail-settings", "regenerate_mediamtx"]);
    },
  });
};
