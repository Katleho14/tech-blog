import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const uploadImage = async (buffer) => {
  try {
    const imgPath = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "tech-blog", secure: true },
          function (error, result) {
            if (error) {
              reject(error);
              return NextResponse.json(
                {
                  error: `Error while uploading image: ${error.message}`,
                },
                { status: 400 }
              );
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
    return imgPath;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Error while uploading image: ${error.message}`,
      },
      { status: 500 }
    );
  }
};

export const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: `Error while deleting image: ${error.message}`,
      },
      { status: 500 }
    );
  }
};

export async function deleteMultipleImages(imageUrls) {
  try {
    if (imageUrls.length === 0) return;

    const deletionPromises = imageUrls.map((url) => deleteImage(url));

    await Promise.allSettled(deletionPromises);
  } catch (error) {
    console.error("Error deleting blog images:", error);
    throw error;
  }
}
