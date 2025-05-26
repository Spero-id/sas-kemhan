import { Permission } from "../Permission/TypePermission";

export type ResponseAllRole = {
  status: boolean;
  data: Role[];
};

export type ResponseDetailRole = {
  status: boolean;
  data: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
  };
};

export type RoleRequest = Partial<{
  name: string;
  permissions: string[];
}>;

export type RoleResponse = {
  message: string;
};

export type Role = Partial<{
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}>;
