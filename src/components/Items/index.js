import "./Items.scss";
import Skeleton from "./Skeleton";

const Items = ({ data, itemsKey }) => {
  const getItemYear = ({ item, itemsKey }) => {
    switch (true) {
      case itemsKey === "series":
        return `${item.startYear} - ${item.endYear}`;
      case itemsKey === "events":
        return `${new Date(item.start).toLocaleDateString(
          "en-EN"
        )} - ${new Date(item.end).toLocaleDateString("en-EN")}`;
      case itemsKey === "comics":
        const dateObj = new Date(
          item.dates.find((d) => d.type === "onsaleDate").date
        );
        return dateObj.getFullYear();
      default:
        return null;
    }
  };

  const getItemUrl = (item) => {
    return item.urls.find((url) => url.type === "detail").url;
  };

  const getItemImg = ({ item, itemsKey }) => {
    if (itemsKey === "events") {
      return `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`;
    }
    return `${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`;
  };

  return (
    <div className="marvel-detail-content">
      <div className={`marvel-container marvel-detail-${itemsKey}-container`}>
        <h3 className="marvel-title marvel-detail-items-title">{itemsKey}</h3>
        <div className="marvel-detail-items-container">
          <ul className={`marvel-detail-items marvel-detail-${itemsKey}`}>
            {data.map((item) => (
              <li
                key={`items-${itemsKey}-${item.id}`}
                className="marvel-detail-item">
                <a
                  href={getItemUrl(item)}
                  className="marvel-detail-item-link"
                  target="_blank"
                  rel="noreferrer">
                  <div className="marvel-detail-item-img_container">
                    <img
                      className="marvel-detail-item-img"
                      alt={item.title}
                      src={getItemImg({ item, itemsKey })}></img>
                  </div>
                  <h4 className="marvel-detail-item-title">{item.title}</h4>
                  <span className="marvel-detail-item-year">
                    {getItemYear({ item, itemsKey })}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Skeleton };
export default Items;
