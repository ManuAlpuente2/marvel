import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CharactersContext from "./context/Characters";
import FavoritesContext from "./context/Favorites";
import "./App.scss";

import Layout from "./modules/Layout";
import Favorites from "./modules/Favorites";
import Home from "./modules/Home";
import Detail from "./modules/Detail";

function App() {
  const [characters, setCharacters] = useState(null);
  const charactersValue = { characters, setCharacters };
  const [favorites, setFavorites] = useState(null);
  const favoritesValue = { favorites, setFavorites };

  useEffect(() => {
    console.log("Getting favorites");
    const favorites = JSON.parse(localStorage.getItem("marvel-favorites"));
    if (favorites) {
      console.log(`Found ${favorites.length} favorites`);
      setFavorites(favorites);
    } else {
      setFavorites([]);
    }
  }, []);

  return (
    <CharactersContext.Provider value={charactersValue}>
      <FavoritesContext.Provider value={favoritesValue}>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="character/:id" element={<Detail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesContext.Provider>
    </CharactersContext.Provider>
  );
}

export default App;
