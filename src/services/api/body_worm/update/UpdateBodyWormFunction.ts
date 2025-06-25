import { axiosClient } from "@/common/utils/AxiosClient";
import { BodyWormRequest, BodyWormResponse } from "@/types/BodyWorm/TypeBodyWorm";

export const UpdateBodyWormFunction = async ({
  id,
  data,
}: {
  id: string;
  data: BodyWormRequest;
}) => {
  try {
    const response = await axiosClient.put<BodyWormResponse>(
      `/secure/body-worm/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
