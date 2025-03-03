import { Link } from "react-router-dom";
import useViewTransition from "../hooks/useViewTransition";

const TransitionLink = ({ to, children, className }) => {
  const { navigateWithTransition } = useViewTransition();

  const handleClick = (e) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default TransitionLink;
