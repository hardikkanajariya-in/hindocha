import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Heart, Sparkles } from "lucide-react";
import { Hero } from "@/components/public/hero";
import { SectionHeader } from "@/components/public/section-header";
import { ProductCard } from "@/components/public/product-card";
import { CategoryCard } from "@/components/public/category-card";
import { ProductGridSkeleton } from "@/components/public/loading-skeleton";
import { getProducts } from "@/lib/queries/products";
import { getActiveCategories } from "@/lib/queries/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinod Season Shop — Premium Decorations & Festive Items",
  alternates: { canonical: "/" },
};

async function FeaturedProducts() {
  const { products } = await getProducts({ limit: 8, publishedOnly: true });
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 8);

  if (displayProducts.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

async function FeaturedCategories() {
  const categories = await getActiveCategories();
  if (categories.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.slice(0, 8).map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Handpicked products that look stunning and last long",
  },
  {
    icon: Truck,
    title: "Wide Selection",
    description: "From flowers to fabrics, find everything for decoration",
  },
  {
    icon: Shield,
    title: "Trusted Since Years",
    description: "Serving thousands of satisfied customers across Gujarat",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each product curated to bring joy to your celebrations",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vinod Season Shop",
    description:
      "Vinod Season Shop specializes in artificial flowers, wedding decorations, pooja items, seasonal decorations, decorative fabrics, garlands, torans, and festival decoration products.",
    telephone: "+919427573299",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      {/* Featured Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          title="Shop by Category"
          subtitle="Explore our wide range of decoration categories"
        />
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
          <FeaturedCategories />
        </Suspense>
        <div className="mt-8 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Products"
            subtitle="Our most popular decoration items"
          />
          <Suspense fallback={<ProductGridSkeleton />}>
            <FeaturedProducts />
          </Suspense>
          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Us"
          subtitle="What makes Vinod Season Shop special"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader
              title="About Vinod Season Shop"
              subtitle="Your trusted partner for festive decorations"
            />
            <p className="text-muted-foreground leading-relaxed">
              Vinod Season Shop specializes in artificial flowers, wedding decorations, pooja items,
              seasonal decorations, decorative fabrics, garlands, torans, and festival decoration
              products. With years of experience and a passion for celebrations, we bring you the
              finest quality products to make every occasion memorable.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Decorate?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Contact us on WhatsApp for personalized recommendations, bulk orders,
            and the best prices on all decoration items.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://wa.me/919427240241?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border bg-gradient-to-br from-pink-50 to-purple-50 p-8 text-center dark:from-pink-950/20 dark:to-purple-950/20 sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Follow Us on Instagram</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Stay updated with our latest collections, behind-the-scenes content,
            and decoration inspiration.
          </p>
          <div className="mt-6">
            <a
              href="https://www.instagram.com/vinod_season_shop12/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              @vinod_season_shop12
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
