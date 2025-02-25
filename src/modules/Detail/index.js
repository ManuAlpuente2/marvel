import { useContext, useState, useEffect } from "react";
import CharactersContext from "../../context/Characters";
import { useParams, Navigate } from "react-router";
import "./Detail.scss";
import { getMarvelCollection } from "../../server";

const Detail = () => {
  const params = useParams();
  const { characters } = useContext(CharactersContext);
  const [character, setCharacter] = useState(null);
  const [data, setData] = useState({});
  const dataKeys = ["comics", "series", "events"];

  useEffect(() => {
    if (!characters?.data) return;
    const characterObj = characters?.data.find(
      (c) => c.id.toString() === params.id
    );
    if (!characterObj) {
      return <Navigate to="/" />;
    } else {
      console.log({ characterObj });
      setCharacter(characterObj);
    }
    dataKeys.map((key) => {
      if (characterObj?.[key]?.available > 0) {
        getMarvelCollection(characterObj?.[key]?.collectionURI).then((data) => {
          console.log({ [key]: data });
          setData((d) => ({ ...d, [key]: data?.results }));
        });
      }
    });
  }, [params.id]);

  //Si no hay datos redirijo a la página principal
  if (!characters?.data) return <Navigate to="/" />;

  const getItemYear = ({ item, key }) => {
    switch (true) {
      case key === "series":
        return `${item.startYear} - ${item.endYear}`;
      case key === "events":
        return `${new Date(item.start).toLocaleDateString(
          "en-EN"
        )} - ${new Date(item.end).toLocaleDateString("en-EN")}`;
      case key === "comics":
        const dateObj = new Date(
          item.dates.find((d) => d.type === "onsaleDate").date
        );
        return dateObj.getFullYear();
      default:
        return null;
    }
  };

  const getItemUrl = (comic) => {
    return comic.urls.find((url) => url.type === "detail").url;
  };

  return (
    <>
      {character ? (
        <div className="marvel-detail">
          <div className="marvel-detail-header">
            <div className="marvel-container marvel-detail-header-container">
              <div className="marvel-detail-image_container">
                <img
                  className="marvel-detail-image"
                  src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                  alt={character.name}
                  title={character.name}
                />
              </div>
              <div className="marvel-detail-txt">
                <h2 className="marvel-detail-title">{character.name}</h2>
                {character?.description ? (
                  <div className="marvel-detail-description">
                    <p>{character.description}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {dataKeys.map((key) =>
            data?.[key]?.length ? (
              <div className="marvel-detail-content">
                <div
                  className={`marvel-container marvel-detail-${key}-conainer`}
                >
                  <h3 className="marvel-detail-items-title">{key}</h3>
                  <div className="marvel-detail-items-container">
                    <ul className="marvel-detail-items marvel-detail-comics">
                      {data?.[key].map((item, index) => (
                        <li key={item.id} className="marvel-detail-item">
                          <a
                            href={getItemUrl(item)}
                            className="marvel-detail-item-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="marvel-detail-item-img_container">
                              <img
                                className="marvel-detail-item-img"
                                alt={item.title}
                                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                              ></img>
                            </div>
                            <h4 className="marvel-detail-item-title">
                              {item.title}
                            </h4>
                            <span className="marvel-detail-item-year">
                              {getItemYear({ item, key })}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : character?.[key]?.available > 0 ? (
              `Loading ${key}...`
            ) : (
              `This character has no ${key}`
            )
          )}
        </div>
      ) : null}
    </>
  );
};

export default Detail;
