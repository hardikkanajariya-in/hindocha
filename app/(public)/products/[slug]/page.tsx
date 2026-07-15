import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries/products";
import { ImageGallery } from "@/components/public/image-gallery";
import { Breadcrumbs } from "@/components/public/breadcrumbs";
import { ProductCard } from "@/components/public/product-card";
import { SectionHeader } from "@/components/public/section-header";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/public/whatsapp-button";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription || product.description || `${product.name} — Vinod Season Shop`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription || undefined,
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.categoryId, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in "${product.name}". Please share more details.`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.images.map((img) => img.url),
    ...(product.price && {
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    }),
    brand: {
      "@type": "Organization",
      name: "Vinod Season Shop",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            ...(product.category
              ? [{ label: product.category.name, href: `/categories/${product.category.slug}` }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <ImageGallery images={product.images} productName={product.name} />

          {/* Product Info */}
          <div className="space-y-6">
            {product.category && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            {product.price && (
              <p className="text-3xl font-bold text-primary">₹{product.price}</p>
            )}

            {product.shortDescription && (
              <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
            )}

            {product.description && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/919427240241?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              Enquire on WhatsApp
            </a>

            <p className="text-center text-sm text-muted-foreground">
              Send us a message and we&apos;ll respond within minutes
            </p>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <SectionHeader
              title="Related Products"
              subtitle="You might also like these items"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      <WhatsAppButton productName={product.name} />
    </>
  );
}
