import { axiosClient } from "@/common/utils/AxiosClient";
import { RegionRequest, RegionResponse } from "@/types/Region/TypeRegion";

export const PostRegionFunction = async (data: RegionRequest) => {
  try {
    const response = await axiosClient.post<RegionResponse>(
      `/secure/region`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
