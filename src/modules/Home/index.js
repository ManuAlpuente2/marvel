import { useEffect, useState, useContext } from "react";
import CharactersContext from "../../context/Characters";
import { getMarvelCharacters } from "./../../server";
import Characters from "../../components/Characters";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { characters, setCharacters } = useContext(CharactersContext);

  useEffect(() => {
    if (characters?.length) return;
    setLoading(true);
    getMarvelCharacters().then((data) => {
      setLoading(false);
      setCharacters(data?.results);
      console.log(data);
    });
  }, []);

  return (
    <div className="marvel-home">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {characters?.length ? <Characters characters={characters} /> : null}
        </>
      )}
    </div>
  );
};

export default Home;
