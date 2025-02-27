import md5 from "md5";
import { privateKey, publicKey } from "./../constants";

export const getMarvelCharacters = ({ search = "" }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${privateKey}${publicKey}`);
  let searchStr = "";
  if (search.length) {
    searchStr = `&nameStartsWith=${search}`;
  }
  const url = `http://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=50${searchStr}`;
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

export const getMarvelCharacter = ({ id }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${privateKey}${publicKey}`);
  const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};
