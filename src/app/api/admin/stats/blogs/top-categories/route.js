export const revalidate = 0;

import { connectDB } from "@/config/db";
import blogs from "@/models/blogModel";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB(); // ✅ FIXED: await the DB connection

    const topCategories = await blogs.aggregate([
      { $group: { _id: "$category", blogCount: { $sum: 1 } } },
      { $sort: { blogCount: -1 } },
    ]);

    return NextResponse.json(topCategories);
  } catch (err) {
    console.error("GET /api/blogs error:", err); // Add logging
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

