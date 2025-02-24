import { useEffect } from "react";
import { getMarvelCharacters } from "./server";
import "./App.scss";

function App() {
  useEffect(() => {
    getMarvelCharacters().then((data) => {
      console.log(data);
    });
  }, []);

  return <div className="App">Portada</div>;
}

export default App;
