"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { settingsSchema, type SettingsFormData } from "@/lib/validations/settings";
import { updateSettings } from "@/lib/actions/settings";
import type { Settings } from "@/lib/db/schema";

interface SettingsFormProps {
  settings: Settings | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      shopName: settings?.shopName || "Vinod Season Shop",
      tagline: settings?.tagline || "",
      phone: settings?.phone || "9427573299",
      whatsapp: settings?.whatsapp || "9427240241",
      instagram: settings?.instagram || "https://www.instagram.com/vinod_season_shop12/",
      address: settings?.address || "Gujarat, India",
      about: settings?.about || "",
      logo: settings?.logo || "",
      heroImage: settings?.heroImage || "",
      businessHours: settings?.businessHours || "Mon-Sat: 9 AM - 8 PM, Sun: 10 AM - 6 PM",
      googleMapEmbed: settings?.googleMapEmbed || "",
    },
  });

  const logoValue = watch("logo");
  const heroImageValue = watch("heroImage");

  const onSubmit = (data: SettingsFormData) => {
    startTransition(async () => {
      try {
        await updateSettings(data);
        toast.success("Settings updated successfully");
      } catch {
        toast.error("Failed to update settings");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">General</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name *</Label>
            <Input id="shopName" {...register("shopName")} />
            {errors.shopName && <p className="text-sm text-destructive">{errors.shopName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" {...register("tagline")} placeholder="Your shop tagline" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea id="about" {...register("about")} rows={4} placeholder="About your shop" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">Contact</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" {...register("whatsapp")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="instagram">Instagram URL</Label>
            <Input id="instagram" {...register("instagram")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" {...register("address")} rows={2} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="businessHours">Business Hours</Label>
            <Input id="businessHours" {...register("businessHours")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="googleMapEmbed">Google Map Embed URL</Label>
            <Input id="googleMapEmbed" {...register("googleMapEmbed")} placeholder="https://maps.google.com/..." />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">Media</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Logo</Label>
            <ImageUploader
              value={logoValue || undefined}
              onChange={(url) => setValue("logo", url)}
              onRemove={() => setValue("logo", "")}
              folder="vinod-season-shop/branding"
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Banner</Label>
            <ImageUploader
              value={heroImageValue || undefined}
              onChange={(url) => setValue("heroImage", url)}
              onRemove={() => setValue("heroImage", "")}
              folder="vinod-season-shop/branding"
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Settings"
        )}
      </Button>
    </form>
  );
}
