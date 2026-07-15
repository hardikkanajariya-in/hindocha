import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug } from "@/lib/queries/categories";
import { getProducts } from "@/lib/queries/products";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { ProductCard } from "@/components/public/product-card";
import { SectionHeader } from "@/components/public/section-header";
import { Pagination } from "@/components/public/pagination";
import { EmptyState } from "@/components/public/empty-state";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.name,
    description: category.description || `Browse ${category.name} products at Vinod Season Shop`,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

export default async function CategoryDetailPage({ params, searchParams }: CategoryDetailPageProps) {
  const { slug } = await params;
  const { page: pageStr } = await searchParams;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = Number(pageStr) || 1;
  const result = await getProducts({ page, categorySlug: slug });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <SectionHeader
        title={category.name}
        subtitle={category.description || `Explore all ${category.name.toLowerCase()} products`}
      />

      {result.products.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              basePath={`/categories/${slug}`}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title="No products yet"
          description={`We're adding ${category.name.toLowerCase()} products soon. Check back later!`}
        />
      )}
    </div>
  );
}
