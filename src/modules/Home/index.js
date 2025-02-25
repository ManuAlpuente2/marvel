import { useEffect, useState, useContext } from "react";
import CharactersContext from "../../context/Characters";
import { getMarvelCharacters } from "./../../server";
import Characters from "../../components/Characters";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { characters, setCharacters } = useContext(CharactersContext);

  useEffect(() => {
    if (characters?.data?.length) return;
    setLoading(true);
    getMarvelCharacters().then((data) => {
      setLoading(false);
      setCharacters((c) => ({ ...c, data: data?.results }));
      console.log(data);
    });
  }, []);

  return (
    <>
      {loading ? (
        <span className="marvel-loading">Loading...</span>
      ) : (
        <>
          {characters?.data?.length ? (
            <Characters characters={characters.data} />
          ) : null}
        </>
      )}
    </>
  );
};

export default Home;
