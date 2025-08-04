import { axiosClient } from "@/common/utils/AxiosClient";
import { HelmetRequest, HelmetResponse } from "@/types/Helmet/TypeHelmet";

export const UpdateHelmetFunction = async ({
  id,
  data,
}: {
  id: string;
  data: HelmetRequest;
}) => {
  try {
    const response = await axiosClient.put<HelmetResponse>(
      `/secure/helmet/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
