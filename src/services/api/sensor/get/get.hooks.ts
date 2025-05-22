import { useQuery } from "@tanstack/react-query";
import { getAllSensorGerak } from "./get.service";

export const useAllSensorGerak = () => {
  return useQuery({
    queryFn: () => getAllSensorGerak(),
    queryKey: ["all"],
  });
};
