import type { Metadata } from "next";
import { getActiveCategories } from "@/lib/queries/categories";
import { CategoryCard } from "@/components/public/category-card";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { SectionHeader } from "@/components/public/section-header";
import { EmptyState } from "@/components/public/empty-state";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse all decoration categories — artificial flowers, garlands, wedding decorations, pooja items, and more.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  const categories = await getActiveCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <SectionHeader
        title="All Categories"
        subtitle="Explore our decoration categories"
      />

      {categories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No categories yet"
          description="Check back soon for our product categories."
        />
      )}
    </div>
  );
}
