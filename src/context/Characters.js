import React from "react";

const CharactersContext = React.createContext({
  characters: {},
  setCharacters: () => {},
});

export default CharactersContext;
