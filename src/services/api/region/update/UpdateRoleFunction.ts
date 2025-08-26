import { axiosClient } from "@/common/utils/AxiosClient";
import { RegionRequest, RegionResponse } from "@/types/Region/TypeRegion";

export const UpdateRegionFunction = async ({
  id,
  data,
}: {
  id: string;
  data: RegionRequest;
}) => {
  try {
    const response = await axiosClient.put<RegionResponse>(`/secure/region/${id}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
