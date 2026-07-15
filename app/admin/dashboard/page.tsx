import { Package, Eye, Star, Grid3X3 } from "lucide-react";
import { StatsCard } from "@/components/admin/stats-card";
import { getProductStats, getRecentProducts } from "@/lib/queries/products";
import { getCategoryCount } from "@/lib/queries/categories";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  const [stats, categoryCount, recentProducts] = await Promise.all([
    getProductStats(),
    getCategoryCount(),
    getRecentProducts(5),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Vinod Season Shop admin panel</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats.total}
          icon={Package}
        />
        <StatsCard
          title="Published"
          value={stats.published}
          icon={Eye}
        />
        <StatsCard
          title="Featured"
          value={stats.featured}
          icon={Star}
        />
        <StatsCard
          title="Categories"
          value={categoryCount}
          icon={Grid3X3}
        />
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Products</h2>
          <Link
            href="/admin/products"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recentProducts.length > 0 ? (
          <div className="space-y-3">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.category?.name || "Uncategorized"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {product.isPublished && (
                    <Badge variant="secondary" className="text-xs">Published</Badge>
                  )}
                  {product.isFeatured && (
                    <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            No products yet.{" "}
            <Link href="/admin/products/new" className="text-primary hover:underline">
              Create your first product
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
