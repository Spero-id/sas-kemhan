import { axiosClient } from "@/common/utils/AxiosClient";
import { StartRequest, StartResponse } from "@/types/Stream/TypeStream";

export const StartRecord = async (data: StartRequest) => {
  try {
    const response = await axiosClient.post<StartResponse>(
      `/secure/record/start`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
