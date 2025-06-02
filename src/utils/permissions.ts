// lib/permissions.ts
export function hasPermission(user: any, permissionCode: string): boolean {
  return user?.role?.permissions_code?.some((code: string) => code === permissionCode) ?? false;
}
