import { useNavigate } from "react-router-dom";

const useViewTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = (to) => {
    if (!document.startViewTransition) {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.startViewTransition(() => {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return { navigateWithTransition };
};

export default useViewTransition;
