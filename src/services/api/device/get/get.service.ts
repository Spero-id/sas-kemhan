import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllDevice } from "@/types/Device/TypeDevice";

export const getAllDevice = async () => {
  const response = await axiosClient.get<ResponseAllDevice>("/secure/device");
  return response.data;
};
