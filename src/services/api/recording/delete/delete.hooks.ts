import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecording } from "./delete.service";

export const useDeleteRecording = ({id}: {id: string}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecording,
    onSuccess: () => {
      queryClient.invalidateQueries(["all-recording"]);
    },
  });
};
