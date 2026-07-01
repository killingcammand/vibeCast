import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// store the file in the disk taking too much time and space, we can directly stream it to cloud storage like AWS S3, Google Cloud Storage, etc. For simplicity,
//  we will store it in the local file system for now.
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });
const storage = multer.memoryStorage();

// filter only video files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = [
    "video/mp4",
    "video/x-matroska",
    "video/avi",
    "video/quicktime",
    "video/webm",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video files are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  
});

export default upload;