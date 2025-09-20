import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MetadataType } from "@/types/metadata.type";

export default function Pages({ data }: { data: MetadataType }) {
  if (data.numberOfPages == 1) return;
  return (
    <Pagination>
      <PaginationContent>
        {data.currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationPrevious
              href={`/products?page=${data.currentPage - 1}`}
            />
          </PaginationItem>
        )}
        {Array.from({ length: data.numberOfPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`/products?page=${i + 1}`}
              isActive={i + 1 == data.currentPage}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {data.numberOfPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {data.nextPage && (
          <PaginationItem>
            <PaginationNext href={`/products?page=${data.nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
