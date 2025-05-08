import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllSensorGerak } from "@/types/SensorGerak/TypeSensorGerak";

export const getAllSensorGerak = async () => {
  const response = await axiosClient.get<ResponseAllSensorGerak>("/secure/sensor-gerak");
  return response.data;
};
