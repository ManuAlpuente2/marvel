import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/img/logo.svg";
import { ReactComponent as FavIcon } from "./../../assets/img/icon-heart-active.svg";
import FavoritesContext from "../../context/Favorites";
import Link from "../../components/TransitionLink";

const Layout = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <>
      <header className="marvel-header">
        <Link to="/">
          <h1 className="sr-only">Marvel Characters app</h1>
          <Logo
            className="marvel-logo marvel-header_logo"
            alt="Logo Marvel"
            title="Go to home"
            aria-label="Go to home"
          />
        </Link>
        <Link
          className={`marvel-header-favBtn ${
            favorites.length === 0 ? "marvel-header-favBtn__hide" : ""
          }`}
          to="/favorites"
        >
          <FavIcon className="marvel-fav-icon" />
          <span className="marvel-favBtn-badge">{favorites.length}</span>
        </Link>
      </header>
      <div className="marvel-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
