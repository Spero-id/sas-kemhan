import { axiosClient } from "@/common/utils/AxiosClient";
import { StopStreamRequest, StopStreamResponse } from "@/types/Stream/TypeStream";

export const StopStream = async (data: StopStreamRequest) => {
  try {
    const response = await axiosClient.post<StopStreamResponse>(
      `/secure/stream/stop`,
      data,
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
