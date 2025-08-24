import { axiosClient } from "@/common/utils/AxiosClient";
import { BodyWormRequest, BodyWormResponse } from "@/types/BodyWorm/TypeBodyWorm";

export const PostBodyWormFunction = async (data: BodyWormRequest) => {
  try {
    const response = await axiosClient.post<BodyWormResponse>(
      `/secure/body-worm`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
