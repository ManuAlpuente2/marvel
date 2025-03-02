import log from "./log";

export const saferizeUrl = (url) => {
  return url.replace("http://", "https://");
};

export { log };
