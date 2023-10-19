import { z } from "zod";

const addReviewZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email({ message: "Invalid email" }),
    photoUrl: z
      .string({
        required_error: "answer is required",
      })
      .url({ message: "invalid url" }),
    details: z.string({
      required_error: "detail is required",
    }),
    rate: z.number({
      required_error: "rate is required",
    }),
  }),
});

export const ReviewValidation = {
  addReviewZodSchema,
};
