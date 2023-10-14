import multer from "multer";
import path from "path";
import httpStatus from "http-status";
import ApiError from "../../errors/ApiError.js";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "image-" + uniqueSuffix);
  },
});

const singleImageUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, "File type is not supported"));
    }
  },
}).single("image");

const bannerImageUploader = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname);
    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, "File type is not supported"));
    }
  },
}).array("image", 3);

export { singleImageUploader, bannerImageUploader };
