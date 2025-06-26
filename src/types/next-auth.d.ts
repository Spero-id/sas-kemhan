import { DefaultSession } from "next-auth";
import { RoleAuth } from "./Role/TypeRole";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: RoleAuth;
    };
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: RoleAuth;
    image: string;
    access_token: string;
  }
}
