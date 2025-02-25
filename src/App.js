import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharactersContext from "./context/Characters";

import Layout from "./modules/Layout";
import Favorites from "./modules/Favorites";
import Home from "./modules/Home";
import "./App.scss";

function App() {
  const [characters, setCharacters] = useState(null);
  const charactersValue = { characters, setCharacters };
  return (
    <CharactersContext.Provider value={charactersValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CharactersContext.Provider>
  );
}

export default App;
