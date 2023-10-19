import { Schema, model } from "mongoose";

const PhotosSchema = Schema(
  {
    place: {
      type: String,
      trim: true,
      required: [true, "place is missing!"],
    },
    date: {
      type: String,
      trim: true,
      required: [true, "date is missing!"],
    },
    photo: {
      type: {
        cloudinaryId: {
          type: String,
          required: [true, "cloudinaryId is missing!"],
        },
        cloudinaryUrl: {
          type: String,
          match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
          required: [true, "cloudinaryUrl is missing!"],
        },
      },
      required: [true, "photo is missing!"],
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Photo = model("Photo", PhotosSchema);

export default Photo;
