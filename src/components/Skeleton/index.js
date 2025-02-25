import "./Skeleton.scss";

const Skeleton = ({
  className = "",
  width = "100%",
  height,
  children,
  as: Component = "div",
}) => {
  return (
    <Component
      className={`${className} marvel-skeleton`}
      style={{ width, height }}
    >
      {children}
    </Component>
  );
};

export default Skeleton;
