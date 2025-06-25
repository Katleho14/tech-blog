import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import commentModel from "@/models/commentModel";

export async function GET(req, { params }) {
  const blogId = params.id;

  // Get session (if any), no auth enforcement
  const session = await getServerSession(authOptions, req);
  const userId = session?.user?.id;

  try {
    await connectDB();

    const comments = await commentModel.find({ blogId }).lean();

    if (!comments || comments.length === 0) {
      return NextResponse.json({ error: "This blog has no comments." }, { status: 404 });
    }

    const commentsWithUserFlag = comments.map((item) => ({
      ...item,
      isUser: userId ? item.userId?.toString() === userId : false,
    }));

    return NextResponse.json(commentsWithUserFlag);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


