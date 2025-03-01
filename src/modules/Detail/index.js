import { useContext, useState, useEffect, useRef } from "react";
import CharactersContext from "../../context/Characters";
import FavoritesContext from "../../context/Favorites";
import { useParams } from "react-router";
import "./Detail.scss";
import { getMarvelCollection, getMarvelCharacter } from "../../server";
import Items, { Skeleton } from "../../components/Items";
import FavBtn from "../../components/FavBtn";
import Link from "../../components/TransitionLink";
import config from "../../config";
import { saferizeUrl } from "../../utils";
const Detail = () => {
  const params = useParams();
  const { characters } = useContext(CharactersContext);
  const { favorites } = useContext(FavoritesContext);
  const [character, setCharacter] = useState(null);
  const [data, setData] = useState({});
  const dataKeys = ["comics", "series", "events"];
  const checkData = useRef(false);

  useEffect(() => {
    if (favorites === null) return;
    if (checkData.current) return;
    //Busco en favoritos o en el contexto de personajes
    const characterObj =
      characters?.data.find((c) => c.id.toString() === params.id) ||
      favorites?.find((c) => c.id.toString() === params.id);
    if (characterObj) {
      console.log(`Found character ${params.id} in favorites or context`);
      setCharacter(characterObj);
    } else {
      //Si no está en favoritos ni en el contexto de personajes, lo busco en la API
      console.log(
        `Character ${params.id} not found in favorites or context, getting from API`
      );
      getMarvelCharacter({ id: params.id }).then((data) => {
        console.log("Found character in API");
        setCharacter(data?.results[0]);
      });
    }
    checkData.current = true;
  }, [favorites]);

  useEffect(() => {
    if (!character) return;
    dataKeys.map((key) => {
      if (character?.[key]?.available > 0) {
        console.log(
          `Getting ${config.collectionsLimit} ${key} collection from API (${character?.[key]?.available} available)`
        );
        getMarvelCollection({
          collectionURI: character?.[key]?.collectionURI,
          key,
        }).then((data) => {
          console.log(`Found ${data?.results?.length} ${key} from API`);
          setData((d) => ({ ...d, [key]: data?.results }));
        });
      }
    });
  }, [character]);

  const renderNoContent = () => {
    const hasAnyData = dataKeys.some((key) => character?.[key]?.available > 0);
    if (!hasAnyData) {
      return (
        <div className="marvel-no-content marvel-detail-no-content">
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
                  src={`${saferizeUrl(character?.thumbnail?.path)}.${
                    character?.thumbnail?.extension
                  }`}
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
                key={key}
                length={
                  character?.[key]?.available < config.collectionsLimit
                    ? character?.[key]?.available
                    : config.collectionsLimit
                }
                itemsKey={key}></Skeleton>
            ) : null
          )}
          {renderNoContent()}
        </div>
      ) : null}
    </>
  );
};

export default Detail;
