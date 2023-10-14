import { z } from "zod";

const updateBannerTitleZodSchema = z.object({
  body: z.object({
    bannerText: z.string({
      required_error: "Banner text is required",
    }),
    bannerSubText: z.string({
      required_error: "Banner sub text is required",
    }),
  }),
});

export const AdminValidation = {
  updateBannerTitleZodSchema,
};
