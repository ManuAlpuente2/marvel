import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "./../../assets/img/marvel-logo.svg";

const Layout = () => {
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
        <Link to="/favorites">Favorites</Link>
      </header>
      <div className="marvel-content">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
