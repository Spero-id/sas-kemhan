import { BodyWorm } from "../BodyWorm/TypeBodyWorm";
import { Helmet } from "../Helmet/TypeHelmet";
import { RoleAuth } from "../Role/TypeRole";

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
    roleId: string;
    last_login: string;
    created_at: string;
    updated_at: string;
    helmet: Helmet;
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
  role: RoleAuth;
  last_login: string;
  created_at: string;
  updated_at: string;
}>;

export type UserDetail = Partial<{
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  role: RoleAuth;
  last_login: string;
  created_at: string;
  updated_at: string;
  helmet: Helmet;
  body_worm: BodyWorm;
}>;

export type UserAuth = {
  id: string;
  name: string;
  email: string;
  role: RoleAuth;
}