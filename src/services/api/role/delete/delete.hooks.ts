import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRole } from "./delete.service";

export const useDeleteRole = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["all"]);
    },
  });
};
