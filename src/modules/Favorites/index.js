import { useContext } from "react";
import FavoritesContext from "../../context/Favorites";
import Characters from "../../components/Characters";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <>
      <h1>Favorites</h1>
      <Characters characters={favorites} />
    </>
  );
};

export default Favorites;
