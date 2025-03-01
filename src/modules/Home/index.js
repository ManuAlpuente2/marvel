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
    console.log(`Getting characters with term: ${term}`);
    setSearchTerm(term);
    console.log("Loading");
    setLoading(true);
    setError(null);
    if (!term) {
      const cached = JSON.parse(localStorage.getItem("marvel-cache"));
      const cacheAge = new Date().getTime() - cached?.lastUpdated;
      const oneDayInMs = 24 * 60 * 60 * 1000;
      console.log(`Cache is ${Math.round(cacheAge / 1000)} seconds old`);
      if (cached && cached.data && cacheAge < oneDayInMs) {
        setCharacters((c) => ({
          ...c,
          data: cached.data,
          searchTerm: term,
        }));
        setInitialLoadDone(true);
        setLoading(false);
        console.log(`Showing ${cached.data?.length} characters from cache`);
      } else {
        console.log("No cached response or cache is older");
        console.log("Getting new characters");
        getMarvelCharacters({}).then((data) => {
          if (currentRequestId === lastRequestId.current) {
            localStorage.setItem(
              "marvel-cache",
              JSON.stringify({
                data: data?.results,
                lastUpdated: new Date().getTime(),
              })
            );
            setCharacters((c) => ({
              ...c,
              data: data?.results,
              searchTerm: term,
            }));
            setInitialLoadDone(true);
            setLoading(false);
            console.log("Showing characters from server");
          }
        });
      }
    } else {
      console.log(`Getting characters with search term: ${term}`);
      getMarvelCharacters({ search: term }).then((data) => {
        if (currentRequestId === lastRequestId.current) {
          setCharacters((c) => ({
            ...c,
            data: data?.results,
            searchTerm: term,
          }));
          setInitialLoadDone(true);
          setLoading(false);
          console.log(
            `Showing ${data?.results?.length} characters from server with search term: ${term}`
          );
        }
      });
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleReset = () => {
    console.log("Resetting search");
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
      handleSearch({ target: { value: "" } });
    }
  };

  const renderNoResults = () => {
    console.log(`Rendering no results for search term: ${searchTerm}`);
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
