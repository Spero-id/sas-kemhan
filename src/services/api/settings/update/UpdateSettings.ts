import { axiosClient } from "@/common/utils/AxiosClient";
import { SettingsRequest, SettingsResponse } from "@/types/Settings/TypeSettings";

export const UpdateSettings = async ({
  id,
  data,
}: {
  id: string;
  data: SettingsRequest;
}) => {
  try {
    const response = await axiosClient.put<SettingsResponse>(`/secure/settings/${id}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
