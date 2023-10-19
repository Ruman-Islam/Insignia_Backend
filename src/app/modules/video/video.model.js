import { Schema, model } from "mongoose";

const VideoSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is missing!"],
    },
    youtubeUrl: {
      type: String,
      trim: true,
      required: [true, "URL is missing!"],
    },
    isSelected: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Video = model("Video", VideoSchema);

export default Video;
