import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import cloudinary from "../../middleware/cloudinary.js";
import Traveler from "../traveler/traveler.model.js";
import User from "./user.model.js";

const profileUpdate = async (payload, userId) => {
  const user = await User.findOne({ userId });

  const updatedData = await Traveler.findByIdAndUpdate(
    { _id: user.traveler },
    payload,
    {
      new: true,
    }
  );

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

const profileImageUpdate = async (payload, userId) => {
  const { path } = payload;

  const user = await User.findOne({ userId }).populate({
    path: "traveler",
  });

  user?.traveler?.photo?.cloudinaryId &&
    (await cloudinary.v2.uploader.destroy(user?.traveler?.photo?.cloudinaryId));

  const result = await cloudinary.v2.uploader.upload(path, {
    folder: "insignia/user-profile",
    use_filename: true,
  });

  const updatedData = await Traveler.findByIdAndUpdate(
    { _id: user.traveler._id },
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
