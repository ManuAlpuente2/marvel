import React, { useRef, useContext, useState, useEffect } from "react";
import CharactersContext from "../../context/Characters";
import { getMarvelCharacters } from "./../../server";
import Characters, { CharactersSkeleton } from "../../components/Characters";
import Skeleton from "../../components/Skeleton";
import { debounce } from "lodash";
import SearchInput from "../../components/SearchInput";
import "./Home.scss";

const Home = () => {
  const { characters, setCharacters } = useContext(CharactersContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(characters?.searchTerm || "");
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const searchInputRef = useRef();
  const lastRequestId = useRef(0);

  const debouncedSearch = useRef(
    debounce((term) => {
      getCharacters(term);
    }, 300)
  ).current;

  useEffect(() => {
    if (characters?.searchTerm) {
      setSearchTerm(characters.searchTerm);
    }
    if (!initialLoadDone && (!characters?.data || !characters.data.length)) {
      getCharacters();
    }
  }, []);

  const getCharacters = (term = "") => {
    const currentRequestId = ++lastRequestId.current;
    setSearchTerm(term);
    setLoading(true);
    setError(null);
    getMarvelCharacters({ search: term }).then((data) => {
      if (currentRequestId === lastRequestId.current) {
        setCharacters((c) => ({
          ...c,
          data: data?.results,
          searchTerm: term,
        }));
        setInitialLoadDone(true);
        setLoading(false);
      }
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleReset = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
      handleSearch({ target: { value: "" } });
    }
  };

  const renderNoResults = () => {
    return (
      <div className="no-results marvel-no-content">
        <p>No characters found with the search "{searchTerm}"</p>
        <button className="marvel-btn" onClick={handleReset}>
          TRY AGAIN
        </button>
      </div>
    );
  };

  const charactersList = characters?.data || [];

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="marvel-search">
        <SearchInput
          value={searchTerm}
          onSearch={handleSearch}
          ref={searchInputRef}
        />
        {loading ? (
          <Skeleton className="home-search-results" width="58px" />
        ) : (
          <p className="home-search-results">
            {charactersList.length}{" "}
            {charactersList.length === 1 ? "RESULT" : "RESULTS"}
          </p>
        )}
      </div>
      {loading ? (
        <CharactersSkeleton />
      ) : charactersList.length > 0 ? (
        <Characters characters={charactersList} />
      ) : (
        searchTerm && renderNoResults()
      )}
    </div>
  );
};

export default Home;
