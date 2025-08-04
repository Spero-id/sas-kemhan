import { getPrismaClient } from "./lib/prisma";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getMinioFileUrl } from "@/utils/minio";

export const config = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Add null checks for credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const prisma = getPrismaClient();

        // Cek apakah email ada di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            role: {
              include: {
                permissions: {
                  include: { permission: true },
                },
              },
            },
          },
        });

        console.log(user);

        // Verifikasi password (pastikan Anda meng-hash password di database)
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          // Return only the necessary user information, excluding the password

          const permissionCodes =
            user?.role?.permissions?.map((p) => p.permission.code) || [];

          const safeUser = {
            ...user,
            role: {
              ...user.role,
              permissions_code: permissionCodes,
            },
          };

          safeUser.image = await getMinioFileUrl(safeUser.image)

          await prisma.user.update({
            where: { id: user.id },
            data: {
              last_login: new Date(),
            },
          });

          return {
            id: safeUser.id.toString(),
            name: safeUser.name,
            email: safeUser.email,
            role: safeUser.role,
            image: safeUser.image
          };
        } else {
          return null; // Jika tidak, login gagal
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      const customAccessToken = jwt.sign(
        session.user,
        process.env.AUTH_SECRET as string
      );

      session.access_token = customAccessToken;

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
