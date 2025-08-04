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
    permissions: RolePermission[];
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

export type RoleAuth = Partial<{
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  permissions_code: string[];
}>;

export type RolePermission = {
  roleId: string;
  permissionId: string;
  created_at: string;
}