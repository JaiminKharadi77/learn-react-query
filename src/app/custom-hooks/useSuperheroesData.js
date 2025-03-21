import { useQuery } from "react-query";
import axios from "axios";

const fecthSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fecthSuperHeroes, {
    onSuccess: onSuccess,
    onError: onError,
    select: (data) => {
      const superheroes = data.data.map((hero) => hero);
      return superheroes;
    },
  });
};
