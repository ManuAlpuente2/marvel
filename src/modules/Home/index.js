import { useEffect, useState, useContext, useCallback, useRef } from "react";
import CharactersContext from "../../context/Characters";
import { getMarvelCharacters } from "./../../server";
import Characters, { CharactersSkeleton } from "../../components/Characters";
import Skeleton from "../../components/Skeleton";
import { debounce } from "lodash";
import SearchInput from "../../components/SearchInput";
import "./Home.scss";

const useCharacterSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { characters, setCharacters } = useContext(CharactersContext);
  const lastRequestId = useRef(0);
  const initialLoadDone = useRef(false);

  const fetchCharacters = useCallback(
    async (term = "") => {
      const currentRequestId = ++lastRequestId.current;
      setSearchTerm(term);

      try {
        setLoading(true);
        setError(null);
        const data = await getMarvelCharacters({ search: term });

        if (currentRequestId === lastRequestId.current) {
          setCharacters((prev) => ({ ...prev, data: data?.results }));
          initialLoadDone.current = true;
        }
      } catch (err) {
        if (currentRequestId === lastRequestId.current) {
          setError(err.message || "Error al cargar los personajes");
        }
      } finally {
        if (currentRequestId === lastRequestId.current) {
          setLoading(false);
        }
      }
    },
    [setCharacters]
  );

  return {
    loading,
    error,
    searchTerm,
    characters: characters?.data || [],
    fetchCharacters,
    initialLoadDone: initialLoadDone.current,
  };
};

const Home = () => {
  const {
    loading,
    error,
    characters,
    searchTerm,
    fetchCharacters,
    initialLoadDone,
  } = useCharacterSearch();

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      fetchCharacters(searchTerm);
    }, 300),
    [fetchCharacters]
  );

  useEffect(() => {
    if (!initialLoadDone && !characters.length) {
      fetchCharacters();
    }
  }, [fetchCharacters, characters.length, initialLoadDone]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    debouncedSearch(searchTerm);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const NoResults = ({ searchTerm }) => (
    <div className="no-results marvel-no-content">
      <p>No characters found with the search "{searchTerm}"</p>
      <button
        className="marvel-btn"
        onClick={() => handleSearch({ target: { value: "" } })}
      >
        Go to home
      </button>
    </div>
  );

  return (
    <div className="home-container">
      <div className="marvel-search">
        <SearchInput onSearch={handleSearch} />
        {loading ? (
          <Skeleton className="home-search-results" width="58px" />
        ) : (
          <p className="home-search-results">
            {characters.length} {characters.length === 1 ? "RESULT" : "RESULTS"}
          </p>
        )}
      </div>
      {loading ? (
        <CharactersSkeleton />
      ) : characters.length > 0 ? (
        <Characters characters={characters} />
      ) : (
        searchTerm && <NoResults searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default Home;
