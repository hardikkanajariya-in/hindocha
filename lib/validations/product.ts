import { z } from "zod/v4";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  shortDescription: z.string().max(500).optional(),
  description: z.string().optional(),
  categoryId: z.number().int().positive().optional().nullable(),
  price: z.string().max(50).optional().nullable(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  displayOrder: z.number().int().min(0),
});

export type ProductFormData = z.infer<typeof productSchema>;
