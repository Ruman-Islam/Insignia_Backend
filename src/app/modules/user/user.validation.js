import { z } from "zod";

const updateUserProfileZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    gender: z.string().optional(),
    martialStatus: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    dateOfBirth: z.string().optional(),
    passportNumber: z.string().optional(),
    passportExpiryDate: z.string().optional(),
    nationalID: z.string().optional(),
    emergencyContact: z.string().optional(),
    religion: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserProfileZodSchema,
};
