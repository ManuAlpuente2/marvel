import { Link } from "react-router-dom";
import Character from "./Character";
import "./Characters.scss";

const Characters = ({ characters }) => {
  return (
    <ul className="marvel-characters">
      {characters.map((character) => (
        <li className="marvel-character-item" key={character.id}>
          <Link
            className="marvel-character-link"
            to={`/character/${character.id}`}
          >
            <Character character={character} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Characters;
