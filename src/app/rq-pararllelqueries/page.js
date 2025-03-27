"use client";
import { useQuery, useQueries } from "react-query";
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
      {/* {superheroes?.data?.map((hero) => {
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
      <hr />
      <DynamicParallelComponent heroIds={[1, 3]} /> */}
      <DependentQueries email="jaimin@gmail.com" />
    </div>
  );
};

export default RqParallelQueries;

const DynamicParallelComponent = ({ heroIds }) => {
  const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  };

  const queryResults = useQueries(
    heroIds.map((id) => {
      return { queryKey: ["superhero", id], queryFn: () => fetchSuperHero(id) };
    })
  );

  console.log({ queryResults });

  return <div>Hello</div>;
};

const DependentQueries = ({ email }) => {
  const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
  };

  const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
  };

  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user?.data.channelId;

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCoursesByChannelId(channelId),
    enabled: !!channelId,
  });

  return (
    <div>
      <h2>Dependent Queries</h2>
      <h3>User</h3>
      {user?.data.name}
      <h3>Courses</h3>
      {courses?.data.courses.map((course) => {
        return <div key={course}>{course}</div>;
      })}
    </div>
  );
};
