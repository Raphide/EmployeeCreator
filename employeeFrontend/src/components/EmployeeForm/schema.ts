import * as z from "zod";

export const schema = z.object({
  firstName: z.string().min(2, "First Name must contain at least 2 characters"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last Name must contain at least 2 characters"),
  gender: z.string().min(1, "Must choose a gender"),
  birthDate: z.string(),
  email: z.string().email("Must be a valid email address"),
  mobile: z.string().regex(/\d+/, "Must only use digits"),
  street: z
    .string()
    .min(5, "Street address must contain at least 5 characters"),
  suburb: z.string().min(3, "Suburb must contain at least 3 characters"),
  state: z.string(),
  postCode: z.string().regex(/\d+/, "Must only use digits"),
  isPermanent: z.boolean(),
  isFullTime: z.boolean(),
  startDate: z.string(),
  finishDate: z.string(),
  weeklyHours: z.number().min(10),
});

export type EmployeeFormData = z.infer<typeof schema>;
