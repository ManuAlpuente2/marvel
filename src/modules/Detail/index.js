import { useContext, useState, useEffect } from "react";
import CharactersContext from "../../context/Characters";
import { useParams, Navigate } from "react-router";
import "./Detail.scss";
import { getMarvelCollection } from "../../server";
import Items, { Skeleton } from "../../components/Items";
import FavBtn from "../../components/FavBtn";
import Link from "../../components/TransitionLink";

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

  const renderNoContent = () => {
    const hasAnyData = dataKeys.some((key) => character?.[key]?.available > 0);
    if (!hasAnyData) {
      return (
        <div className="marvel-detail-no-content">
          <div className="marvel-detail-container">
            <p>No additional content available for this character.</p>
            <Link className="marvel-btn" to="/">
              Go to home
            </Link>
          </div>
        </div>
      );
    }
    return null;
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
                <h2 className="marvel-detail-title">
                  <span className="marvel-detail-title-txt">
                    {character.name}
                  </span>
                  <FavBtn item={character} />
                </h2>
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
              <Items key={key} itemsKey={key} data={data[key]} />
            ) : character?.[key]?.available > 0 ? (
              <Skeleton
                length={
                  character?.[key]?.available < 20
                    ? character?.[key]?.available
                    : 20
                }
                itemsKey={key}
              ></Skeleton>
            ) : null
          )}
          {renderNoContent()}
        </div>
      ) : null}
    </>
  );
};

export default Detail;
