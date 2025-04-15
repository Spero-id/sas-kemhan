import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "./delete.service";

export const useDeleteUser = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["all"]);
    },
  });
};
