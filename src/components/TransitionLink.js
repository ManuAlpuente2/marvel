import { Link } from "react-router-dom";
import useViewTransition from "../hooks/useViewTransition";

const TransitionLink = ({ to, children, className }) => {
  const { navigateWithTransition } = useViewTransition();

  return (
    <Link
      to={to}
      className={className}
      onClick={() => {
        navigateWithTransition(to);
      }}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
