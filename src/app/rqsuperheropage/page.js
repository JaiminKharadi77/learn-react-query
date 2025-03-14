"use client";

import React, { cache } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fecthSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

function onSuccess(res) {
  console.log("Side Effect after Success Api", res);
}

function onError(err) {
  console.log("Side Effect after  Api Error", err);
}

function RQSuperHeroPage() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fecthSuperHeroes,
    { onSuccess: onSuccess, onError: onError }
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
      <button onClick={refetch}>Summon Super heroes</button>
      {data?.data.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
}

export default RQSuperHeroPage;
