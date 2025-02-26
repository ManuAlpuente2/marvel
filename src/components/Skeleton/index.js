import "./Skeleton.scss";

const Skeleton = ({ className = "", width = "100%", height }) => {
  return (
    <div
      className={`${className} marvel-skeleton`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
