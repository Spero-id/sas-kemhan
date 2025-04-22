import { axiosClient } from "@/common/utils/AxiosClient";
import { UserRequest, UserResponse } from "@/types/User/TypeUser";
import { buildFormData } from "@/utils/formData";

export const PostUserFunction = async (data: UserRequest) => {
  const formData = new FormData();
  buildFormData(formData, data);

  const response = await axiosClient.post<UserResponse>(`/secure/user`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};