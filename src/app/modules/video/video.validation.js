import { z } from "zod";

const addVideoZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    youtubeUrl: z
      .string({
        required_error: "answer is required",
      })
      .url({ message: "Invalid url" }),
  }),
});

const updateVideoZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    youtubeUrl: z.string().url({ message: "Invalid url" }).optional(),
  }),
});

export const VideoValidation = {
  addVideoZodSchema,
  updateVideoZodSchema,
};
