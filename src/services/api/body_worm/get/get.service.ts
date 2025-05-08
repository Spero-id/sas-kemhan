import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllBodyWorm } from "@/types/BodyWorm/TypeBodyWorm";

export const getAllBodyWorm = async () => {
  const response = await axiosClient.get<ResponseAllBodyWorm>("/secure/body-worm");
  return response.data;
};
