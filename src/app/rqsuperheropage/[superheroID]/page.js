"use client";

import React from "react";
import { useSuperHeroData } from "@/app/custom-hooks/useSuperHeroData";

const SuperHeroPage = ({ params }) => {
  const { superheroID } = params;

  const { isLoading, data, isError, error } = useSuperHeroData(superheroID);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error fetching data {error.message}</h2>;
  }

  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default SuperHeroPage;
