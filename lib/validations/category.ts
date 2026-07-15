import { z } from "zod/v4";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: z.string().optional(),
  image: z.string().optional(),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
