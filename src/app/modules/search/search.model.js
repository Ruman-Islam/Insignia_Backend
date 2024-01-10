import { Schema, model } from "mongoose";

const SearchSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is missing!"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Search = model("Search", SearchSchema);

export default Search;
