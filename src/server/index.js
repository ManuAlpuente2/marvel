import md5 from "md5";
import config from "./../config";

export const getMarvelCharacters = ({ search = "" }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${config.privateKey}${config.publicKey}`);
  let searchStr = "";
  if (search.length) {
    searchStr = `&nameStartsWith=${search}`;
  }
  const url = `${config.apiUrl}characters?ts=${timeStamp}&apikey=${config.publicKey}&hash=${hash}&limit=${config.charactersLimit}${searchStr}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};

export const getMarvelCollection = ({ collectionURI, key }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${config.privateKey}${config.publicKey}`);
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
  const url = `${collectionURI}?ts=${timeStamp}&apikey=${config.publicKey}&hash=${hash}&limit=${config.collectionsLimit}${orderParam}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};

export const getMarvelCharacter = ({ id }) => {
  const timeStamp = new Date().getTime();
  const hash = md5(`${timeStamp}${config.privateKey}${config.publicKey}`);
  const url = `${config.apiUrl}characters/${id}?ts=${timeStamp}&apikey=${config.publicKey}&hash=${hash}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.data);
};
