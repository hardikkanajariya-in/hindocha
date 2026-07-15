"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductWithImages } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in "${product.name}". Please share more details.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          {product.isFeatured && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>

        <div className="space-y-2 p-4">
          {product.category && (
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.category.name}
            </span>
          )}
          <h3 className="line-clamp-2 font-semibold leading-tight transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          {product.shortDescription && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          )}
          <div className="flex items-center justify-between pt-1">
            {product.price && (
              <span className="text-lg font-bold text-primary">₹{product.price}</span>
            )}
            <span
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://wa.me/919427240241?text=${whatsappMessage}`, "_blank");
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Enquire
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
