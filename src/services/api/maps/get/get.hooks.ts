import { useQuery } from "@tanstack/react-query";
import { getAllPeople } from "./get.service";

export const useAllPeople = () => {
  return useQuery({
    queryFn: () => getAllPeople(),
    queryKey: ["all"],
  });
};
