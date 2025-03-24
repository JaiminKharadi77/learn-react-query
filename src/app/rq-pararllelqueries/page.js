"use client";
import { useQuery } from "react-query";
import axios from "axios";
const RqParallelQueries = () => {
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
  };
  const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends");
  };

  const { data: superheroes } = useQuery("superheroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  console.log(superheroes, friends);

  return (
    <div>
      {superheroes?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            {hero.name} - {hero.alterEgo}
          </div>
        );
      })}
      <hr />
      {friends?.data?.map((friend) => {
        return <div key={friend.id}>{friend.name}</div>;
      })}
    </div>
  );
};

export default RqParallelQueries;
