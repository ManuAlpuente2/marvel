import { useContext } from "react";
import FavoritesContext from "../../context/Favorites";
import Characters from "../../components/Characters";
import "./Favorites.scss";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <>
      <div className="marvel-title-container">
        <h1 className="marvel-title marvel-title-favorites">Favorites</h1>
      </div>
      <Characters characters={favorites} />
    </>
  );
};

export default Favorites;
