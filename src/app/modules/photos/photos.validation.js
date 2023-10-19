import { z } from "zod";

const addPhotoZodSchema = z.object({
  body: z.object({
    place: z.string({
      required_error: "place is required",
    }),
    date: z.string({
      required_error: "date or phone is required",
    }),
    photo: z.object({
      cloudinaryId: z.string({
        required_error: "cloudinaryId is required",
      }),
      cloudinaryUrl: z
        .string({
          required_error: "cloudinaryId is required",
        })
        .url({ message: "Invalid url" }),
    }),
  }),
});

export const PhotoValidation = {
  addPhotoZodSchema,
};
