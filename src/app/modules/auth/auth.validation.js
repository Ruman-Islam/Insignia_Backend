import { z } from "zod";

const registerZodSchema = z.object({
  body: z.object({
    userName: z.string({
      required_error: "Username is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{6,}$/),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{6,}$/),
  }),
});

const googleLoginZodSchema = z.object({
  body: z.object({
    accessToken: z.string({
      required_error: "Access token is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

export const AuthValidation = {
  registerZodSchema,
  loginZodSchema,
  googleLoginZodSchema,
  refreshTokenZodSchema,
};
