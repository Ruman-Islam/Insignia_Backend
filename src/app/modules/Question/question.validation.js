import { z } from "zod";

const addQuestionZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    emailOrPhone: z.string({
      required_error: "email or phone is required",
    }),
    questionText: z.string({
      required_error: "question text is required",
    }),
  }),
});

export const QuestionValidation = {
  addQuestionZodSchema,
};
