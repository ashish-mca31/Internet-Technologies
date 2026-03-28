import React from 'react';

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ marginTop: '10px' }}>
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      {' '}Page {page} of {totalPages}{' '}
      <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
