// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/config/db";
import userModel from "@/models/userModel";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // optional, more explicit than 'jwt: true'
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          await connectDB();
          const userExist = await userModel.findOne({ email: user.email });

          if (!userExist) {
            let username = user.email.split("@")[0];
            let existingUser = await userModel.findOne({ username });
            let suffix = 1;

            while (existingUser) {
              username = `${user.email.split("@")[0]}${suffix}`;
              existingUser = await userModel.findOne({ username });
              suffix++;
            }

            const newUser = new userModel({
              displayName: user.name,
              email: user.email,
              username,
              profileImg: user.image,
              isAdmin: false,
            });

            const savedUser = await newUser.save();
            token.id = savedUser._id;
            token.username = username;
            token.isAdmin = false;
            token.isSuper = false;
          } else {
            token.id = userExist._id;
            token.username = userExist.username;
            token.isAdmin = userExist.isAdmin;
            token.isSuper = userExist.isSuper;
            token.blocked = userExist.blocked;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.isSuper = token.isSuper;
        session.user.blocked = token?.blocked;
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  events: {
    error: (message) => {
      console.error("NextAuth error:", message);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ EXPORT correctly
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);


