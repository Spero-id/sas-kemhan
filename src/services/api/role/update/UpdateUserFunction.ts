import { axiosClient } from "@/common/utils/AxiosClient";
import { UserRequest, UserResponse } from "@/types/User/TypeUser";
import { buildFormData } from "@/utils/formData";

export const UpdateUserFunction = async ({
  id,
  data,
}: {
  id: string;
  data: UserRequest;
}) => {
  const formData = new FormData();
  buildFormData(formData, data);

  const response = await axiosClient.put<UserResponse>(`/secure/user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
