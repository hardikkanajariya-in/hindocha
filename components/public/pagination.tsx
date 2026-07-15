import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          aria-label="Previous page"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border opacity-50">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={buildUrl(page)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border text-sm hover:bg-muted"
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          aria-label="Next page"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border opacity-50">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
