import { axiosClient } from "@/common/utils/AxiosClient";
import { UploadVideoRequest, UploadVideoResponse } from "@/types/Chat/TypeChat";
import { buildFormData } from "@/utils/formData";

export const PostUploadVideoFunction = async (data: UploadVideoRequest) => {
  const formData = new FormData();
  buildFormData(formData, data);

  const response = await axiosClient.post<UploadVideoResponse>(`/secure/chat/upload-video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};