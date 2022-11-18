import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Character from './Character';

const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    console.log(queryKey);
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return res.json();
  };

  const { data, isLoading, isError, error, isPreviousData } = useQuery(
    ['characters', page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  console.log(data);

  //   if (status === 'loading') {
  //     return <h2>Loading...</h2>;
  //   }

  //   if (status === 'error') {
  //     return <h2>Error</h2>;
  //   }

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="characters">
      {data.results.map((character) => (
        <Character character={character} />
      ))}

      <div>
        <button disabled={page === 1} onClick={() => setPage((old) => old - 1)}>
          Previous
        </button>
        <button
          disabled={!data.info.next || isPreviousData}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Characters;
