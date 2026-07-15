import Link from "next/link";
import Image from "next/image";
import { Plus, Package, MoreHorizontal, Eye, EyeOff, Star, StarOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProducts } from "@/lib/queries/products";
import { deleteProduct, toggleProductPublished, toggleProductFeatured } from "@/lib/actions/products";

interface AdminProductsPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const result = await getProducts({ page, search, publishedOnly: false, limit: 20 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">{result.total} total products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search */}
      <form className="max-w-sm">
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search products..."
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </form>

      {/* Products Table */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Product</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-left font-medium">Price</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {result.products.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{product.name}</p>
                        <p className="truncate text-xs text-muted-foreground">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {product.category?.name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    {product.price ? `₹${product.price}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Badge variant={product.isPublished ? "secondary" : "outline"} className="text-xs">
                        {product.isPublished ? "Published" : "Draft"}
                      </Badge>
                      {product.isFeatured && (
                        <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/admin/products/${product.id}/edit`} className="flex w-full items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <form action={toggleProductPublished.bind(null, product.id, !product.isPublished)}>
                            <button type="submit" className="flex w-full items-center">
                              {product.isPublished ? (
                                <><EyeOff className="mr-2 h-4 w-4" />Unpublish</>
                              ) : (
                                <><Eye className="mr-2 h-4 w-4" />Publish</>
                              )}
                            </button>
                          </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <form action={toggleProductFeatured.bind(null, product.id, !product.isFeatured)}>
                            <button type="submit" className="flex w-full items-center">
                              {product.isFeatured ? (
                                <><StarOff className="mr-2 h-4 w-4" />Unfeature</>
                              ) : (
                                <><Star className="mr-2 h-4 w-4" />Feature</>
                              )}
                            </button>
                          </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <form action={deleteProduct.bind(null, product.id)}>
                            <button type="submit" className="flex w-full items-center">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </button>
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {result.products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No products found.{" "}
                    <Link href="/admin/products/new" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {result.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: result.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/products?page=${p}${search ? `&search=${search}` : ""}`}
              className={`rounded-lg px-3 py-1 text-sm ${
                p === page ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
