"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpaceDisk } from "./get.service";

export const useGetSpaceDisk = () => {
  return useQuery({
    queryFn: () => getSpaceDisk(),
    queryKey: ["get-space-disk"],
  });
};