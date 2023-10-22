import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }),
    lastName: z.string({
      required_error: "Last name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
  }),
});

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
  createAdminZodSchema,
  updateBannerTitleZodSchema,
};
