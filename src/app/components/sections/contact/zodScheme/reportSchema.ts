import { z } from "zod";

export const reportSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  selectedCategoryId: z.number({
    invalid_type_error: "Category must be selected",
    required_error: "Category must be selected",
  }),
});

export type ReportInputs = z.infer<typeof reportSchema>;
