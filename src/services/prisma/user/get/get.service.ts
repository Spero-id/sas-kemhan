import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseAllGalery, ResponseAllPhotosGalery, ResponseDetailGalery } from "@/types/Galery/TypeGalery";

export const getAllGalery = async () => {
  const response = await axiosClient.get<ResponseAllGalery>("/galery");
  return response.data;
};

export const getDetailGalery = async (id: string) => {
  const response = await axiosClient.get<ResponseDetailGalery>(`/galery/${id}`);
  return response.data;
};

export const getAllPhotosGalery = async (id: string) => {
  const response = await axiosClient.get<ResponseAllPhotosGalery>(`/galery/${id}/file`);
  return response.data;
};
