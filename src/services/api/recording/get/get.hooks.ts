import { useQuery } from "@tanstack/react-query";
import { getAllRecording } from "./get.service";

export const useAllRecording = ({ path_slug }: { path_slug: string }) => {
  return useQuery({
    queryFn: () => getAllRecording(path_slug),
    queryKey: ["all-recording", path_slug],
  });
};