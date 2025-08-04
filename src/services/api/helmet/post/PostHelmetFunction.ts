import { axiosClient } from "@/common/utils/AxiosClient";
import { HelmetRequest, HelmetResponse } from "@/types/Helmet/TypeHelmet";

export const PostHelmetFunction = async (data: HelmetRequest) => {
  try {
    const response = await axiosClient.post<HelmetResponse>(
      `/secure/helmet`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
