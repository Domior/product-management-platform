import { useState, useMemo } from 'react';

interface UsePaginationProps {
  limit: number;
  total: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageNumbers: number[];
  firstPage: number;
  lastPage: number;
  paginate: (page: number) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const usePagination = ({ limit, total }: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = useMemo(
    () =>
      Array(Math.ceil(total / limit))
        .fill(0)
        .map((_, i) => i + 1),
    [total, limit],
  );

  const firstPage = pageNumbers[0];
  const lastPage = pageNumbers[pageNumbers.length - 1];

  const handlePrevClick = () => {
    if (currentPage === firstPage) return;
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage === lastPage) return;
    setCurrentPage(currentPage + 1);
  };

  return { currentPage, paginate, pageNumbers, handleNextClick, handlePrevClick, firstPage, lastPage };
};
