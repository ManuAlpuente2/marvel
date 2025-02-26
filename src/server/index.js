import md5 from "md5";
import { privateKey, publicKey } from "./../constants";

export const getMarvelCharacters = () => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${privateKey}${publicKey}`);
  const url = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=50`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};

export const getMarvelCollection = ({ collectionURI, key }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${privateKey}${publicKey}`);
  let orderParam = "";
  switch (key) {
    case "comics":
      orderParam = "&orderBy=-onsaleDate";
      break;
    case "series":
      orderParam = "&orderBy=-startYear";
      break;
    case "events":
      orderParam = "&orderBy=-modified";
      break;
    default:
      orderParam = "";
  }
  const url = `${collectionURI}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=20${orderParam}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};
