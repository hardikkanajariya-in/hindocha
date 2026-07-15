"use server";

import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { verifySession } from "@/lib/auth";

async function requireAuth() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");
}

export async function uploadImageAction(formData: FormData) {
  await requireAuth();

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const folder = (formData.get("folder") as string) || "vinod-season-shop";
  const result = await uploadImage(file, folder);
  return result;
}

export async function deleteImageAction(publicId: string) {
  await requireAuth();
  await deleteImage(publicId);
}
