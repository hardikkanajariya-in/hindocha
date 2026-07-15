import { notFound } from "next/navigation";
import { getProductById } from "@/lib/queries/products";
import { getCategories } from "@/lib/queries/categories";
import { ProductForm } from "@/components/admin/product-form";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (isNaN(productId)) notFound();

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Update &ldquo;{product.name}&rdquo;</p>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
