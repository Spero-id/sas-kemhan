import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllPeople } from "@/types/Maps/TypeMaps";

export const getAllPeople = async () => {
  const response = await axiosClient.get<ResponseAllPeople>("https://fms.spero-lab.id/api/gps-location/status");
  return response.data;
};
