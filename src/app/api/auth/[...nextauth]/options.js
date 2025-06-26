import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/config/db";
import userModel from "@/models/userModel";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      const existingUser = await userModel.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new userModel({
          googleId: account.provider === "google" ? account.providerAccountId : undefined,
          username: user.name?.toLowerCase().replace(/\s+/g, "_") || `user_${Date.now()}`,
          displayName: user.name || "No Name",
          email: user.email,
          profileImg: user.image || "/default-profile.png", // fallback
        });

        await newUser.save();
      }

      return true;
    },

    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;

        // Optional: populate full user details in session
        const dbUser = await userModel.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.username = dbUser.username;
          session.user.profileImg = dbUser.profileImg;
          session.user.isAdmin = dbUser.isAdmin;
          session.user.blocked = dbUser.blocked;
        }
      }
      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

