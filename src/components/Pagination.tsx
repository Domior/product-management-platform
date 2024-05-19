import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

import { usePagination } from '@/hooks/usePagination';

type Props = {
  limit: number;
  total: number;
  className: string;
};

const PaginationComponent = ({ limit, total, className }: Props) => {
  const { currentPage, paginate, pageNumbers, firstPage, lastPage, handleNextClick, handlePrevClick } = usePagination({
    limit,
    total,
  });

  return (
    <Pagination className={className ?? ''}>
      <PaginationContent>
        <PaginationItem className={`cursor-pointer ${currentPage === firstPage ? 'opacity-50' : ''}`}>
          <PaginationPrevious onClick={handlePrevClick} />
        </PaginationItem>
        {pageNumbers.map(pageNumber => (
          <PaginationItem key={pageNumber}>
            <PaginationLink className="cursor-pointer" onClick={() => paginate(pageNumber)} isActive={currentPage === pageNumber}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className={`cursor-pointer ${currentPage === lastPage ? 'opacity-50' : ''}`}>
          <PaginationNext onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
