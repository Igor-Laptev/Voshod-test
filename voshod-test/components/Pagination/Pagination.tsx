import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps): JSX.Element => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={index + 1 === currentPage ? styles.active : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
