import React, { Fragment, useState } from 'react';

import Pagination from '../Pagination/Pagination';

const Alluser = ({ data, itemsPerPage, startFrom }) => {
  const [search, setSearch] = useState('');
  const [sortByKey, setSortByKey] = useState('name');
  const [order, setOrder] = useState('asc');
  const columns = [
    { label: 'First Name', sortKey: 'first_name' },
    { label: 'Last Name', sortKey: 'last_name' },
    { label: 'Age', sortKey: 'age' },
    { label: 'Email', sortKey: 'email' },
    { label: 'Website', sortKey: 'web' },
  ];

  const {
    slicedData,
    pagination,
    filteredData,
    changePage,
    setFilteredData,
    setSearching,
  } = Pagination({ itemsPerPage, data, startFrom });

  const submitHandler = (e) => {
    e.preventDefault();
    setSearching(true);
    const copiedData = [...data];
    const filtered = copiedData.filter((user) => {
      return (
        user.first_name.toLowerCase().includes(search) ||
        user.last_name.toLowerCase().includes(search)
      );
    });
    const copyOfFilteredData = [...filtered];
    const sortFiltered = sortData(copyOfFilteredData, sortByKey, order);
    setFilteredData(sortFiltered);
  };

  const sortHandler = (sortBy, orderBy) => {
    if (sortByKey !== sortBy) {
      setSortByKey(sortBy);
    }
    if (order !== orderBy) {
      setOrder(orderBy);
    }
    const copyOfFilteredData = [...filteredData];
    const filtered = sortData(copyOfFilteredData, sortBy, orderBy);
    setFilteredData(filtered);
  };

  const sortData = (dataToSort, sortBy, orderBy) => {
    const filtered = dataToSort.sort((a, b) => {
      if (orderBy === 'asc') {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        } else if (a[sortBy] > b[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (b[sortBy] < a[sortBy]) {
          return -1;
        } else if (b[sortBy] > a[sortBy]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return filtered;
  };

  // const onFirstnameClicked = (key) => {
  //   console.log('first name Clicked', key);
  // };
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="mt-3 mb-3 is-flex"
        style={{ justifyContent: 'center' }}
      >
        <div className="field mr-2">
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Search with first or last name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="button is-link">
          Search
        </button>
      </form>
      {slicedData.length > 0 ? (
        <Fragment>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      sortHandler(
                        col.sortKey,
                        sortByKey === col.sortKey
                          ? order === 'asc'
                            ? 'desc'
                            : 'asc'
                          : 'asc'
                      )
                    }
                  >
                    {col.label}
                    {sortByKey === col.sortKey && (
                      <span className="icon">
                        {order === 'asc' ? (
                          <i className="fas fa-sort-up"></i>
                        ) : (
                          <i className="fas fa-sort-down"></i>
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item) => (
                <tr key={item.id}>
                  {/* <td onClick={() => onFirstnameClicked(item.id)}> */}
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>{item.web}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="pagination">
            <ul className="pagination-list">
              {pagination.map((page) => {
                if (!page.ellipsis) {
                  return (
                    <li key={page.id}>
                      <a
                        href="/#"
                        className={
                          page.current
                            ? 'pagination-link is-current'
                            : 'pagination-link'
                        }
                        onClick={(e) => changePage(page.id, e)}
                      >
                        {page.id}
                      </a>
                    </li>
                  );
                } else {
                  return (
                    <li key={page.id}>
                      <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                  );
                }
              })}
            </ul>
          </nav>
        </Fragment>
      ) : (
        <div className="message is-link">
          <div className="message-body has-text-centered">No results found</div>
        </div>
      )}
    </div>
  );
};

export default Alluser;
