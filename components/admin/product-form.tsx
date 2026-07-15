"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiImageUploader } from "@/components/admin/image-uploader";
import { productSchema, type ProductFormData } from "@/lib/validations/product";
import { createProduct, updateProduct, addProductImage, deleteProductImage } from "@/lib/actions/products";
import type { Category, ProductWithImages } from "@/lib/db/schema";

interface ProductFormProps {
  product?: ProductWithImages;
  categories: Category[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!product;

  const [images, setImages] = useState<Array<{
    id?: number;
    url: string;
    publicId?: string;
    altText?: string;
  }>>(
    product?.images.map((img) => ({
      id: img.id,
      url: img.url,
      publicId: img.cloudinaryPublicId,
      altText: img.altText || undefined,
    })) || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      shortDescription: product?.shortDescription || "",
      description: product?.description || "",
      categoryId: product?.categoryId,
      price: product?.price || "",
      isFeatured: product?.isFeatured || false,
      isPublished: product?.isPublished ?? true,
      displayOrder: product?.displayOrder || 0,
    },
  });

  const nameValue = watch("name");

  const generateSlug = () => {
    const slug = slugify(nameValue, { lower: true, strict: true });
    setValue("slug", slug);
  };

  const onSubmit = (data: ProductFormData) => {
    startTransition(async () => {
      try {
        if (isEditing && product) {
          await updateProduct(product.id, data);

          // Handle new images
          for (const img of images) {
            if (!img.id && img.publicId) {
              await addProductImage(product.id, {
                cloudinaryPublicId: img.publicId,
                url: img.url,
                altText: img.altText,
                displayOrder: images.indexOf(img),
              });
            }
          }

          toast.success("Product updated successfully");
        } else {
          const newProduct = await createProduct(data);

          // Add images
          for (const img of images) {
            if (img.publicId) {
              await addProductImage(newProduct.id, {
                cloudinaryPublicId: img.publicId,
                url: img.url,
                altText: img.altText,
                displayOrder: images.indexOf(img),
              });
            }
          }

          toast.success("Product created successfully");
        }
        router.push("/admin/products");
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  const handleAddImage = (url: string, publicId: string) => {
    setImages((prev) => [...prev, { url, publicId }]);
  };

  const handleRemoveImage = (index: number) => {
    const img = images[index];
    if (img?.id) {
      startTransition(async () => {
        await deleteProductImage(img.id!);
        setImages((prev) => prev.filter((_, i) => i !== index));
      });
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Basic Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" {...register("name")} placeholder="e.g. Marigold Garland" />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <div className="flex gap-2">
                  <Input id="slug" {...register("slug")} placeholder="e.g. marigold-garland" />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    Generate
                  </Button>
                </div>
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  {...register("shortDescription")}
                  placeholder="Brief product summary"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Detailed product description"
                  rows={5}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Product Images</h2>
            <MultiImageUploader
              images={images}
              onAdd={handleAddImage}
              onRemove={handleRemoveImage}
            />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Organization</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <select
                  id="categoryId"
                  {...register("categoryId")}
                  className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                >
                  <option value="">No category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  {...register("price")}
                  placeholder="e.g. 250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  {...register("displayOrder")}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Visibility</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-sm text-muted-foreground">Make this product visible</p>
                </div>
                <Switch
                  checked={watch("isPublished")}
                  onCheckedChange={(checked) => setValue("isPublished", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-sm text-muted-foreground">Show on homepage</p>
                </div>
                <Switch
                  checked={watch("isFeatured")}
                  onCheckedChange={(checked) => setValue("isFeatured", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            isEditing ? "Update Product" : "Create Product"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
