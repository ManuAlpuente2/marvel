import FavBtn from "../FavBtn";
import { saferizeUrl } from "../../utils";
const Character = ({ character }) => {
  return (
    <div className="marvel-character">
      <div className="marvel-character-img_container">
        <img
          className="marvel-character-img"
          src={`${saferizeUrl(character?.thumbnail?.path)}/standard_xlarge.${
            character?.thumbnail?.extension
          }`}
          alt={character.name}
          title={`Go to ${character.name} detail`}
        />
      </div>
      <div className="marvel-character-bottom">
        <h2 className="marvel-character-name">{character.name}</h2>
        <FavBtn item={character} />
      </div>
    </div>
  );
};

export default Character;
