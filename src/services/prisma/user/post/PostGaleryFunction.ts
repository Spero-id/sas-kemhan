import { axiosClient } from "@/common/utils/AxiosClient";
import { GaleryRequest, GaleryResponse } from "@/types/Galery/TypeGalery";
import { buildFormData } from "@/utils/formData";

export const PostGaleryFunction = async (data: GaleryRequest) => {
  const formData = new FormData();
  buildFormData(formData, data);

  const response = await axiosClient.post<GaleryResponse>(`/galery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

  return response;
};