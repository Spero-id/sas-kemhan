import { axiosClient } from "@/common/utils/AxiosClient";
import { ResponseStatusHelmet } from "@/types/Helmet/TypeHelmet";

export const PostStatusHelmetOffFunction = async ({ user_id }: { user_id: string }) => {
  try {
    const response = await axiosClient.post<ResponseStatusHelmet>(
      `/secure/helmet/status/off`,
      { user_id: user_id },
    );

    return response;
  } catch (error: any) {
    throw error;
  }
};
