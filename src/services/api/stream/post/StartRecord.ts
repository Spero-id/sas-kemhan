import { axiosClient } from "@/common/utils/AxiosClient";
import { StartRecordRequest, StartRecordResponse } from "@/types/Stream/TypeStream";

export const StartRecord = async (data: StartRecordRequest) => {
  try {
    const response = await axiosClient.post<StartRecordResponse>(
      `/secure/record/start`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
