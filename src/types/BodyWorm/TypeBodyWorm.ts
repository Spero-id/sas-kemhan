export type BodyWorm = {
  user_id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ResponseAllBodyWorm = {
  status: boolean;
  data: BodyWorm[];
};

export type ResponseDetailBodyWorm = {
  status: boolean;
  data: BodyWorm;
};
