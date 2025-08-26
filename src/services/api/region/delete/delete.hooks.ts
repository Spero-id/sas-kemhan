import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegion } from "./delete.service";

export const useDeleteRegion = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-region"]);
    },
  });
};
