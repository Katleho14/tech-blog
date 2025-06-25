// seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./src/models/blogModel.js"; // Adjust if your model file name is different
import posts from "./src/utils/post.js";

dotenv.config();

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected! Clearing existing blogs...");
    await Blog.deleteMany({});

    console.log("Seeding blog posts...");
    await Blog.insertMany(posts);

    console.log("✅ Blog posts seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
    process.exit(1);
  }
}

seedDatabase();
