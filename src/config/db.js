import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DataBase successfully!");
    });
    connection.on("error", (err) => {
      console.log(err.message);
      process.exit();
    });
  } catch (error) {
    console.log(error.message);
  }
}
