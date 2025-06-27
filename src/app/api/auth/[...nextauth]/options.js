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
    async signIn({ user, account, profile }) {
      try {
        if (!user?.email) {
          console.error("No email provided by OAuth provider");
          return false;
        }

        await connectDB();

        const existingUser = await userModel.findOne({ email: user.email });

        if (!existingUser) {
          const username = user.name?.toLowerCase().replace(/\s+/g, "_") || `user_${Date.now()}`;
          
          const newUser = new userModel({
            googleId: account?.provider === "google" ? account.providerAccountId : undefined,
            username,
            displayName: user.name || "No Name",
            email: user.email,
            profileImg: user.image || "/default-profile.png",
          });

          await newUser.save();
          console.log("✅ New user created:", username);
        }

        return true;
      } catch (error) {
        console.error("❌ SignIn error:", error);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        if (token?.sub) {
          session.user.id = token.sub;

          // Connect to DB before querying - this was missing!
          await connectDB();
          
          const dbUser = await userModel.findOne({ email: session.user.email });

          if (dbUser) {
            session.user.username = dbUser.username;
            session.user.profileImg = dbUser.profileImg;
            session.user.isAdmin = dbUser.isAdmin || false;
            session.user.blocked = dbUser.blocked || false;
          }
        }
        return session;
      } catch (error) {
        console.error("❌ Session callback error:", error);
        return session;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

