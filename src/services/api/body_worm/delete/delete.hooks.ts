import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBodyWorm } from "./delete.service";

export const useDeleteBodyWorm = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBodyWorm,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-body-worm"]);
      queryClient.invalidateQueries(["detail-settings", "regenerate_mediamtx"]);
    },
  });
};
