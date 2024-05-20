import { useState } from 'react';
import { FIRST_PAGE_NUMBER } from '@/constants/pagination';

export interface UsePaginationReturn {
  currentPage: number;
  paginate: (page: number) => void;
  handleNextClick: () => void;
  handlePrevClick: () => void;
}

export const usePagination = (): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE_NUMBER);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevClick = () => setCurrentPage(currentPage - 1);
  const handleNextClick = () => setCurrentPage(currentPage + 1);

  return { currentPage, paginate, handleNextClick, handlePrevClick };
};
