import { User } from "../User/TypeUser";

export type Cctv = {
  user_id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  user: User;
};

export type ResponseAllCctv = {
  status: boolean;
  data: Cctv[];
}