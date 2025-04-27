export type ResponseAllUser = {
  status: boolean;
  data: User[];
};

export type ResponseDetailUser = {
  status: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    cctv: Cctv;
    sensor_gerak: SensorGerak;
    body_worm: BodyWorm;
  };
};

export type Cctv = {
  user_id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type SensorGerak = {
  user_id: string;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type BodyWorm = {
  user_id: string;
  name: string;
  path_slug: string;
  rtsp_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export type UserRequest = Partial<{
  name: string;
  email: string;
  password: string;
}>;

export type UserResponse = {
  message: string;
};

export type User = Partial<{
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  role: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}>;
