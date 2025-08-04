import { useQuery } from "@tanstack/react-query";
import { getDetailSettings } from "./get.service";

export const useDetailSettings = ({ name }: { name: string }) => {
  return useQuery({
    queryFn: () => getDetailSettings(name),
    queryKey: ["detail-settings", name],
  });
};