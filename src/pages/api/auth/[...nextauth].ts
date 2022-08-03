import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@server/db/client";
import { env } from "@server/env.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: "smtp://71e58d604ce0e4:974ff36882ca3b@smtp.mailtrap.io:2525",
      from: "noreply@example.com",
    }),
    // ...add more providers here
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     name: {
    //       label: "Name",
    //       type: "text",
    //       placeholder: "Enter your name",
    //     },
    //   },
    //   async authorize(credentials, _req) {
    //     const user = { id: 1, name: credentials?.name ?? "J Smith" };
    //     return user;
    //   },
    // }),
  ],
};

export default NextAuth(authOptions);
