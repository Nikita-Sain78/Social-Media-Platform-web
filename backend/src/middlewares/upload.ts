import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import { Readable } from "stream";

// keep files in memory buffer, we'll stream to cloudinary manually
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// helper to upload buffer to cloudinary
export const uploadToCloudinary = (
  buffer: Buffer,
  mimetype: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype.startsWith("video") ? "video" : "image";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        resource_type: resourceType,
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url); // 👈 this is the URL you save to MongoDB
      },
    );

    // convert buffer to readable stream and pipe to cloudinary
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};
