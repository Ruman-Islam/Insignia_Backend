import { Schema, model } from "mongoose";

const PackageSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is missing!"],
    },
    overview: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    timing: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    inclusionExclusion: {
      type: String,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
    options: {
      type: String,
      trim: true,
    },
    policy: {
      type: String,
      trim: true,
    },
    durationText: {
      type: String,
      trim: true,
    },
    cancelationText: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    regularPrice: {
      type: Number,
    },
    prices: [
      {
        option: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    discounts: [
      {
        applicablePersons: {
          type: Number,
        },
        percentages: {
          type: Number,
        },
      },
    ],
    tags: [{ title: String }],
    locationDetails: {
      type: {
        area: String,
        country: String,
        countryCode: String,
        alias: String,
      },
    },
    featuredPicture: {
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
    pictures: [
      {
        type: {
          cloudinaryId: {
            type: String,
            required: [true, "cloudinaryId is missing!"],
          },
          cloudinaryUrl: {
            type: String,
            match: [
              /(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              "Invalid URL format",
            ],
            required: [true, "cloudinaryUrl is missing!"],
          },
        },
        required: [true, "photo is missing!"],
      },
    ],
    isPopular: {
      type: Boolean,
      default: false,
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

const Package = model("Package", PackageSchema);

export default Package;
