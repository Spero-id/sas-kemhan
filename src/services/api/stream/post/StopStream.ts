import { axiosClient } from "@/common/utils/AxiosClient";
import { StopRequest, StopResponse } from "@/types/Stream/TypeStream";

export const StopStream = async (data: StopRequest) => {
  try {
    const response = await axiosClient.post<StopResponse>(
      `/secure/stream/stop`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
