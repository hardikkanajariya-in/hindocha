import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";

export async function getSettings() {
  try {
    const result = await db.select().from(settings).limit(1);
    return result[0] ?? null;
  } catch (error) {
    console.error("Failed to get settings:", error);
    return null;
  }
}
