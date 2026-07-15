import { z } from "zod/v4";

export const settingsSchema = z.object({
  shopName: z.string().min(1, "Shop name is required").max(255),
  tagline: z.string().max(500).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  whatsapp: z.string().max(20).optional().nullable(),
  instagram: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  about: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  heroImage: z.string().optional().nullable(),
  businessHours: z.string().optional().nullable(),
  googleMapEmbed: z.string().optional().nullable(),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
