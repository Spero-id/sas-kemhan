import { axiosClient } from "@/common/utils/AxiosClient";
import { GaleryRequest, GaleryResponse } from "@/types/Galery/TypeGalery";
import { buildFormData } from "@/utils/formData";

export const UpdateGaleryFunction = async ({
  id,
  data,
}: {
  id: string;
  data: GaleryRequest;
}) => {
  const formData = new FormData();
  buildFormData(formData, data);

  const response = await axiosClient.post<GaleryResponse>(`/galery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
