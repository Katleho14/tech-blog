import { connectDB } from "@/config/db";
import blogs from "@/models/blogModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  try {
    await connectDB();

    const searchTerm = searchParams.get("term") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { author: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const blogData = await blogs
      .find(query)
      .select("title url updatedAt")
      .skip(skip)
      .limit(limit);

    const total = await blogs.countDocuments(query);

    if (blogData.length === 0) {
      return NextResponse.json({ error: "No blogs found" }, { status: 404 });
    }

    return NextResponse.json({ blogs: blogData, total }, { status: 200 });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

