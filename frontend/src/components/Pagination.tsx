"use client";

import Button from "@/components/ui/Button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6 gap-2">
      <Button size="sm" className="!w-22" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
      <span className="px-4 py-2 text-gray-700 dark:text-gray-300">Page {page} of {totalPages}</span>
      <Button size="sm" className="!w-22" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
    </div>
  );
}
