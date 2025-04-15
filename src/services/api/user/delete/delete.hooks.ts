import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGalery } from "./delete.service";

export const useDeleteGalery = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGalery,
    onSuccess: () => {
      queryClient.invalidateQueries(["all"]);
    },
  });
};
