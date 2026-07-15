import { getCategories } from "@/lib/queries/categories";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Product</h1>
        <p className="text-muted-foreground">Create a new product listing</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
