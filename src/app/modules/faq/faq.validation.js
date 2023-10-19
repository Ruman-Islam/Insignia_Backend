import { z } from "zod";

const addFaqZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    answer: z.string({
      required_error: "answer is required",
    }),
  }),
});

export const FaqValidation = {
  addFaqZodSchema,
};
