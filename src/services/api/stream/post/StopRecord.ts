import { axiosClient } from "@/common/utils/AxiosClient";
import { StopRecordRequest, StopRecordResponse } from "@/types/Stream/TypeStream";

export const StopRecord = async (data: StopRecordRequest) => {
  try {
    const response = await axiosClient.post<StopRecordResponse>(
      `/secure/record/stop`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
