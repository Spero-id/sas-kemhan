import { BodyWorm } from "../BodyWorm/TypeBodyWorm";
import { Cctv } from "../Cctv/TypeCctv";
import { SensorGerak } from "../SensorGerak/TypeSensorGerak";

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
