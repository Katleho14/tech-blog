import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    return NextResponse.json({
      message: "Welcome to tech-blog API",
    });
  } catch (error) {
    NextResponse.json({
      error: error.message,
    });
  }
};
