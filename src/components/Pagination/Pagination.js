import { useState, useEffect } from 'react';

const Pagination = (initialState) => {
  const { itemsPerPage, data, startFrom } = initialState;
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(filteredData.length / perPage);
  const pagination = [];
  const [currentPage, setCurrentPage] = useState(
    startFrom <= pages ? startFrom : 1
  );
  const [slicedData, setSlicedData] = useState(
    [...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage)
  );

  useEffect(() => {
    setSlicedData(
      [...filteredData].slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
      )
    );
    if (searching) {
      setCurrentPage(1);
      setSearching(false);
    }
  }, [filteredData, currentPage]);

  let ellipsisLeft = false;
  let ellipsisRight = false;
  for (let i = 1; i <= pages; i++) {
    if (i === currentPage) {
      pagination.push({ id: i, current: true, ellipsis: false });
    } else {
      if (
        i < 2 ||
        i > pages - 1 ||
        i === currentPage - 1 ||
        i === currentPage + 1
      ) {
        pagination.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisLeft = true;
      } else if (i < pages && i > currentPage && !ellipsisRight) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisRight = true;
      }
    }
  }

  const changePage = (page, e) => {
    e.preventDefault();
    if (page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...data].slice((page - 1) * perPage, page * perPage));
    }
  };

  return {
    slicedData,
    pagination,
    filteredData,
    changePage,
    setFilteredData,
    setSearching,
  };
};

export default Pagination;
