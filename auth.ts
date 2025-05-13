import { getPrismaClient } from './lib/prisma'
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

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
        console.log(process.env.NEXTAUTH_SECRET)
        // Add null checks for credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const prisma = getPrismaClient();

        // Cek apakah email ada di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        // Verifikasi password (pastikan Anda meng-hash password di database)
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // Return only the necessary user information, excluding the password

          await prisma.user.update({
            where: { id: user.id },
            data: {
              last_login: new Date()
            }
          })

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          }
        } else {
          return null // Jika tidak, login gagal
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
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
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);