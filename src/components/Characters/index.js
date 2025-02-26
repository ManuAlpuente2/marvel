import Character from "./Character";
import CharactersSkeleton from "./Skeleton";
import "./Characters.scss";
import Link from "../../components/TransitionLink";

const Characters = ({ characters }) => {
  if (!characters?.length) return;
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

export { CharactersSkeleton };
export default Characters;
