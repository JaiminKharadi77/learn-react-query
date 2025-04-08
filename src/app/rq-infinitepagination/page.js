"use client";
import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

// Define the fetch function that will be used by useInfiniteQuery
// pageParam is provided by React Query and represents the current page number
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data, // The paginated data grouped by pages
    fetchNextPage, // Function to fetch the next page of data
    hasNextPage, // Boolean indicating if more pages are available
    isFetching,
    isFetchingNextPage, // Loading state specifically for fetching next page
  } = useInfiniteQuery(["colors"], fetchColors, {
    // Function to determine the next page number
    // Returns undefined when there are no more pages
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default InfiniteQueriesPage;
