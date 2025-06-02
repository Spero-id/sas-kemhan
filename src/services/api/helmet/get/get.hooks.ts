import { useQuery } from "@tanstack/react-query";
import { getAllHelmet } from "./get.service";

export const useAllHelmet = () => {
  return useQuery({
    queryFn: () => getAllHelmet(),
    queryKey: ["all"],
  });
};
