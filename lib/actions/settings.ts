"use server";

import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";
import type { SettingsFormData } from "@/lib/validations/settings";

async function requireAuth() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");
}

export async function updateSettings(data: SettingsFormData) {
  await requireAuth();

  const existing = await db.select().from(settings).limit(1);

  if (existing.length === 0) {
    await db.insert(settings).values({
      shopName: data.shopName,
      tagline: data.tagline || null,
      phone: data.phone || null,
      whatsapp: data.whatsapp || null,
      instagram: data.instagram || null,
      address: data.address || null,
      about: data.about || null,
      logo: data.logo || null,
      heroImage: data.heroImage || null,
      businessHours: data.businessHours || null,
      googleMapEmbed: data.googleMapEmbed || null,
    });
  } else {
    await db
      .update(settings)
      .set({
        shopName: data.shopName,
        tagline: data.tagline || null,
        phone: data.phone || null,
        whatsapp: data.whatsapp || null,
        instagram: data.instagram || null,
        address: data.address || null,
        about: data.about || null,
        logo: data.logo || null,
        heroImage: data.heroImage || null,
        businessHours: data.businessHours || null,
        googleMapEmbed: data.googleMapEmbed || null,
        updatedAt: new Date(),
      })
      .where(eq(settings.id, existing[0].id));
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
