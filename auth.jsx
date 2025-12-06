import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const { auth, handlers } = NextAuth({
  providers: [
    // ---------- Credentials Provider ----------
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),

    // ---------- GitHub OAuth Provider ----------
    GitHub,

    // ---------- Google OAuth Provider ----------
    Google,
  ],

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = auth?.user;
      const path = nextUrl.pathname;

      const isProtected =
        path.startsWith("/add-profile") ||
        (path.startsWith("/profile/") && path.endsWith("/edit"));

      return !isProtected || isLoggedIn;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },

    async jwt({ token, user, account, profile }) {
      // Local login
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      // GitHub OAuth
      if (account?.provider === "github" && profile?.email) {
        token.email = profile.email;
      }

      // Google OAuth
      if (account?.provider === "google" && profile?.email) {
        token.email = profile.email;
      }

      return token;
    },
  },
});
