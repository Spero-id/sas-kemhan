import { axiosClient } from "@/common/utils/AxiosClient";
import { GenerateMediaMTXResponse } from "@/types/GenerateMediaMTX/TypeGenerateMediaMTX";

export const PostGenerateMediaMTX = async () => {
  try {
    const response = await axiosClient.post<GenerateMediaMTXResponse>(
      `/secure/generate-yml`,
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
