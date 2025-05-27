import { axiosClient } from "@/common/utils/AxiosClient";
import { CctvRequest, CctvResponse } from "@/types/Cctv/TypeCctv";

export const UpdateCctvFunction = async ({
  id,
  data,
}: {
  id: string;
  data: CctvRequest;
}) => {
  try {
    const response = await axiosClient.put<CctvResponse>(
      `/secure/cctv/${id}`,
      data
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};
