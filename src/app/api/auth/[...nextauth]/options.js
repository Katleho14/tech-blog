import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/config/db";
import userModel from "@/models/userModel";

export const authOptions = {
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
    strategy: "jwt", // Use 'jwt' for stateless sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          await connectDB();
          let existingUser = await userModel.findOne({ email: user.email });

          if (!existingUser) {
            // Generate a unique username
            let baseUsername = user.email.split("@")[0];
            let username = baseUsername;
            let suffix = 1;

            while (await userModel.findOne({ username })) {
              username = `${baseUsername}${suffix}`;
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
            token.username = savedUser.username;
            token.isAdmin = savedUser.isAdmin;
            token.isSuper = false;
            token.blocked = false;
          } else {
            token.id = existingUser._id;
            token.username = existingUser.username;
            token.isAdmin = existingUser.isAdmin;
            token.isSuper = existingUser.isSuper;
            token.blocked = existingUser.blocked;
          }
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      try {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.isSuper = token.isSuper;
        session.user.blocked = token.blocked;
        return session;
      } catch (error) {
        console.error("Session Callback Error:", error);
        return session;
      }
    },
  },
  events: {
    error: (message) => {
      console.error("NextAuth error event:", message);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
