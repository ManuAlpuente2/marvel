import { useContext } from "react";
import FavoritesContext from "../../context/Favorites";
import { ReactComponent as FavIcon } from "./../../assets/img/icon-heart.svg";
import { ReactComponent as FavIconActive } from "./../../assets/img/icon-heart-active.svg";
import "./FavBtn.scss";

const FavBtn = ({ item }) => {
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const checkIsFavorite = ({ item }) => {
    return favorites?.find((f) => f.id === item.id);
  };

  const isFavorite = checkIsFavorite({ item });

  const handleClick = () => {
    if (isFavorite) {
      console.log(`Removing ${item.name} from favorites`);
      const newFavorites = favorites.filter((f) => f.id !== item.id);
      setFavorites(newFavorites);
      localStorage.setItem("marvel-favorites", JSON.stringify(newFavorites));
    } else {
      console.log(`Adding ${item.name} to favorites`);
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      localStorage.setItem("marvel-favorites", JSON.stringify(newFavorites));
    }
  };

  return (
    <button
      className="marvel-transparent-btn marvel-fav-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick();
      }}>
      {isFavorite ? (
        <FavIconActive className="marvel-fav-icon marvel-fav-icon__on" />
      ) : (
        <FavIcon className="marvel-fav-icon marvel-fav-icon__off" />
      )}
    </button>
  );
};

export default FavBtn;
