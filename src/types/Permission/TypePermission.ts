export type Permission = {
  id: number;
  name: string;
  code: string;
  createdAt: Date;
};

export type ResponseAllPermission = {
  status: boolean;
  data: Permission[];
};