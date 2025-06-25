import { axiosClient } from "@/common/utils/AxiosClient";
import { StarRequest, StarResponse } from "@/types/Stream/TypeStream";

export const PostStar = async (data: StarRequest) => {
  try {
    const response = await axiosClient.post<StarResponse>(
      `/secure/stream/star`,
      data
    );
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error ?? "Gagal update";
    throw new Error(errorMessage);
  }
};