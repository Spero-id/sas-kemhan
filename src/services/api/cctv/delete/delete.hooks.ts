import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCCTV } from "./delete.service";

export const useDeleteCCTV = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCCTV,
    onSuccess: () => {
      queryClient.invalidateQueries(["all"]);
    },
  });
};
