import Skeleton from "../Skeleton";

const CharactersSkeleton = () => {
  return (
    <ul className="marvel-characters marvel-characters-skeleton">
      {Array(50)
        .fill(1)
        .map((_, index) => (
          <li className="marvel-character-item" key={index}>
            <div className="marvel-character">
              <div className="marvel-character-img_container">
                <Skeleton
                  width="100%"
                  height="100%"
                  className="marvel-character-img"
                />
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CharactersSkeleton;
