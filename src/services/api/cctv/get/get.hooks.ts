import { useQuery } from "@tanstack/react-query";
import { getAllCctv } from "./get.service";

export const useAllCctv = () => {
  return useQuery({
    queryFn: () => getAllCctv(),
    queryKey: ["all"],
  });
};
