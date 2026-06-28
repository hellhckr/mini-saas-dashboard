import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  status: z.enum(["active", "on hold", "completed"]),
  deadline: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date",
    }),
  assigned_team_member: z.string().min(2, "Name required"),
  budget: z.coerce.number().positive("Must be greater than 0"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;