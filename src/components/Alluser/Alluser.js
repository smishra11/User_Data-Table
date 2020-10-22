import React, { Fragment, useState } from 'react';

import Pagination from '../Pagination/Pagination';

const Alluser = ({ data, itemsPerPage, startFrom }) => {
  const [search, setSearch] = useState('');
  const {
    slicedData,
    pagination,
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
    setFilteredData(filtered);
  };

  const onFirstnameClicked = (key) => {
    console.log('first name Clicked', key);
  };
  return (
    <div className="wrapper">
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item) => (
                <tr key={item.id}>
                  <td onClick={() => onFirstnameClicked(item.id)}>
                    {item.first_name}
                  </td>
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
