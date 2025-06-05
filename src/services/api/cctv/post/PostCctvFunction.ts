import { axiosClient } from "@/common/utils/AxiosClient";
import { CctvRequest, CctvResponse } from "@/types/Cctv/TypeCctv";

export const PostCctvFunction = async (data: CctvRequest) => {
  try {
    console.log(data)
    const response = await axiosClient.post<CctvResponse>(
      `/secure/cctv`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
