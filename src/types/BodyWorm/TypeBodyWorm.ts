export type BodyWorm = {
  id: number;
  name: string;
  path_slug: string;
  rtsp_url: string;
  star: boolean;
  status: boolean;
  need_convert: boolean;
  created_at: string;
  updated_at: string;
};

export type ResponseAllBodyWorm = {
  status: boolean;
  data: BodyWorm[];
};

export type BodyWormRequest = Partial<{
  name: string;
  path_slug: string;
  rtsp_url: string;
  lat: string;
  long: string;
}>;

export type BodyWormResponse = {
  message: string;
};

export type ResponseDetailBodyWorm = {
  status: boolean;
  data: BodyWorm;
};
