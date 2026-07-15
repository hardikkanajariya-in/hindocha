import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/queries/categories";
import { CategoryForm } from "@/components/admin/category-form";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const categoryId = Number(id);
  if (isNaN(categoryId)) notFound();

  const category = await getCategoryById(categoryId);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <p className="text-muted-foreground">Update &ldquo;{category.name}&rdquo;</p>
      </div>
      <CategoryForm category={category} />
    </div>
  );
}
