import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import cloudinary from "../../middleware/cloudinary.js";
import User from "./user.model.js";

const profileUpdate = async (payload, userId) => {
  const updatedData = await User.findOneAndUpdate({ userId }, payload, {
    new: true,
  });

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

const profileImageUpdate = async (payload, userId) => {
  const { path } = payload;

  const user = await User.findOne({ userId });

  user?.photo?.cloudinaryId &&
    (await cloudinary.v2.uploader.destroy(user?.photo?.cloudinaryId));

  const result = await cloudinary.v2.uploader.upload(path, {
    folder: "insignia/user-profile",
    use_filename: true,
  });

  const updatedData = await User.findOneAndUpdate(
    { userId },
    {
      photo: {
        cloudinaryId: result.public_id,
        cloudinaryUrl: result.secure_url,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

export const UserService = {
  profileUpdate,
  profileImageUpdate,
};
