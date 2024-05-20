import { useMemo } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import { FIRST_PAGE_NUMBER } from '@/constants/pagination';
import { UsePaginationReturn } from '@/hooks/usePagination';

type Props = {
  limit: number;
  total: number;
  className: string;
} & UsePaginationReturn;

const PaginationComponent = ({ limit, total, currentPage, paginate, handleNextClick, handlePrevClick, className }: Props) => {
  const pageNumbers: number[] = useMemo(
    () =>
      Array(Math.ceil(total / limit))
        .fill(0)
        .map((_, i) => i + 1),
    [total, limit],
  );

  const lastPage = pageNumbers[pageNumbers.length - 1];

  return (
    <Pagination className={className ?? ''}>
      <PaginationContent>
        <PaginationItem className={`cursor-pointer ${currentPage === FIRST_PAGE_NUMBER ? 'opacity-50' : ''}`}>
          <PaginationPrevious
            onClick={() => {
              if (currentPage === FIRST_PAGE_NUMBER) return;
              handlePrevClick();
            }}
          />
        </PaginationItem>
        {pageNumbers.map(pageNumber => (
          <PaginationItem key={pageNumber}>
            <PaginationLink className="cursor-pointer" onClick={() => paginate(pageNumber)} isActive={currentPage === pageNumber}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className={`cursor-pointer ${currentPage === lastPage ? 'opacity-50' : ''}`}>
          <PaginationNext
            onClick={() => {
              if (currentPage === lastPage) return;
              handleNextClick();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
