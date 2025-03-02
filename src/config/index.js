import developmentConfig from "./development";
import productionConfig from "./production";

let config = developmentConfig;

export const useProductionConfig = () => {
  config = productionConfig;

  if (!config.enableLogs) {
    console.originalLog = console.log;
    console.log = function () {};
  }
};

export const useDevelopmentConfig = () => {
  config = developmentConfig;

  if (typeof console.originalLog === "function") {
    console.log = console.originalLog;
    delete console.originalLog;
  }
};

export default config;
