import { AUTH_API } from "@/config/routes/auth";
import { axiosClient } from "@/common/utils/AxiosClient";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export interface LoginResponse {
  message: string;
  access_token: string;
  token_type: string;
  user : {
    id: string;
    name: string;
    email: string;
    email_verified_at: boolean | null;
  }
}

export const config = {
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const response = await axiosClient.post<LoginResponse>(
            AUTH_API.LOGIN,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
        
          let token = response.data.access_token;

          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            token
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return {
        ...token, 
        ...user
      };
    },
    async session({ session, token }: any) {
      return {
        ...session,
        ...token,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
