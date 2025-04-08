"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = (page) => {
  return axios.get(`http://localhost:4000/colors?_page=${page}&_limit=2`);
};

function RqPaginated() {
  const [page, setPage] = useState(1);

  //   const { isLoading, isError, error, data, isFetching } = useQuery(
  //     ["colors", page],
  //     () => fetchColors(page),
  //     {
  //       keepPreviousData: true,
  //     }
  //   );

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["colors", page],
    () => fetchColors(page)
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <ul>
        {data.data.map((color) => (
          <li key={color.id}>
            <h3>{color.label}</h3>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <br />
        <span> Page {page} </span>
        <br />
        <button
          onClick={() =>
            setPage((old) => (!data || !data.data.length ? old : old + 1))
          }
          disabled={isFetching || !data || !data.data.length}
        >
          Next Page
        </button>
      </div>
      {isFetching ? <span> Loading...</span> : null}
    </div>
  );
}

export default RqPaginated;
