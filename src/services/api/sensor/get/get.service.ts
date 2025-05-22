import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllSensor } from "@/types/Sensor/TypeSensor";

export const getAllSensorGerak = async () => {
  const response = await axiosClient.get<ResponseAllSensor>("/secure/sensor");
  return response.data;
};
