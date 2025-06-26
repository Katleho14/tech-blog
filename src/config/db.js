import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("✅ Connected to Database Successfully!");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Connection error:", error.message);
  }
}
