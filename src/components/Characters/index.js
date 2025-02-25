import Character from "./Character";
import "./Characters.scss";

const Characters = ({ characters }) => {
  return (
    <ul className="marvel-characters">
      {characters.map((character) => (
        <li className="marvel-character-item" key={character.id}>
          <Character character={character} />
        </li>
      ))}
    </ul>
  );
};

export default Characters;
