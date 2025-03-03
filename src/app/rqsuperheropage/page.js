"use client";

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fecthSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroess");
};

function RQSuperHeroPage() {
  const { isLoading, data, isError, error } = useQuery(
    "super-heroes",
    fecthSuperHeroes
  );

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
