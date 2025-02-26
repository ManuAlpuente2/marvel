import Skeleton from "../Skeleton";

const ItemsSkeleton = ({ itemsKey = null, length = 20 }) => {
  return (
    <div className={`marvel-detail-content marvel-detail-${itemsKey}`}>
      <div className={`marvel-container`}>
        <h3 className="marvel-detail-items-title">{itemsKey}</h3>
        <div className="marvel-detail-items-container">
          <ul className="marvel-detail-items marvel-detail-comics">
            {Array(length)
              .fill(1)
              .map((e, i) => (
                <li
                  className="marvel-detail-item"
                  key={`detail-item-${itemsKey}-skeleton-${i}`}>
                  <span className="marvel-detail-item-link">
                    <div className="marvel-detail-item-img_container">
                      <Skeleton
                        width="100%"
                        height="100%"
                        className="marvel-detail-item-img"
                      />
                    </div>
                    <Skeleton
                      width="100%"
                      className="marvel-detail-item-title"
                    />
                    <Skeleton width="60%" className="marvel-detail-item-year" />
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemsSkeleton;
