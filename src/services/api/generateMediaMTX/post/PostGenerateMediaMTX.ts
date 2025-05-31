import { axiosClient } from "@/common/utils/AxiosClient";
import { CctvResponse } from "@/types/Cctv/TypeCctv";

export const PostGenerateMediaMTX = async () => {
  try {
    const response = await axiosClient.post<CctvResponse>(
      `/secure/cctv`,
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
