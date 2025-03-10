"use client";

import React, { cache } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fecthSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

function RQSuperHeroPage() {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "super-heroes",
    fecthSuperHeroes,
    {
      // staleTime: 30000, // api will fetch new data the after 30s
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <div>RQSuperHeroPage</div>
      {data?.data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
}

export default RQSuperHeroPage;
