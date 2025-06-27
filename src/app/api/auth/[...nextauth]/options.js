import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// Dynamically import connectDB and userModel at runtime only
let connectDB, userModel;

// Lazy-load DB modules to avoid build-time issues
const getDatabaseModules = async () => {
  if (!connectDB || !userModel) {
    const db = await import("@/config/db");
    const model = await import("@/models/userModel");

    connectDB = db.default; // for default export
    userModel = model.default;
  }
  return { connectDB, userModel };
};

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
      try {
        if (!user?.email) {
          console.error("❌ No email from OAuth provider");
          return false;
        }

        // Skip DB ops if no URI (prevents build crash)
        if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
          console.log("⚠️ Skipping DB during production build (no MONGODB_URI)");
          return true;
        }

        const { connectDB, userModel } = await getDatabaseModules();
        await connectDB();

        const existingUser = await userModel.findOne({ email: user.email });

        if (!existingUser) {
          const username = user.name?.toLowerCase().replace(/\s+/g, "_") || `user_${Date.now()}`;

          const newUser = new userModel({
            googleId: account?.provider === "google" ? account.providerAccountId : undefined,
            githubId: account?.provider === "github" ? account.providerAccountId : undefined,
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
        console.error("❌ Error in signIn callback:", error.message);
        return process.env.NODE_ENV === "production";
      }
    },

    async session({ session, token }) {
      try {
        if (!session?.user?.email) return session;

        if (process.env.NODE_ENV === "production" && !process.env.MONGODB_URI) {
          return session;
        }

        const { connectDB, userModel } = await getDatabaseModules();
        await connectDB();

        const dbUser = await userModel.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.username = dbUser.username;
          session.user.profileImg = dbUser.profileImg;
          session.user.isAdmin = dbUser.isAdmin || false;
          session.user.blocked = dbUser.blocked || false;
        }

        return session;
      } catch (error) {
        console.error("❌ Error in session callback:", error.message);
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
