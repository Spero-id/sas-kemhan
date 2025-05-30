import { axiosClient } from "@/common/utils/AxiosClient";
import { StartRequest, StartResponse } from "@/types/Stream/TypeStream";

export const StartStream = async (data: StartRequest) => {
  try {
    const response = await axiosClient.post<StartResponse>(
      `/secure/stream/start`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
