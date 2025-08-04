import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHelmet } from "./delete.service";

export const useDeleteHelmet = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHelmet,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-helmet"]);
      queryClient.invalidateQueries(["detail-settings", "regenerate_mediamtx"]);
    },
  });
};
