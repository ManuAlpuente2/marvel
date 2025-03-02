import config from "../config";

const log = (...args) => {
  if (config.enableLogs) {
    console.log(...args);
  }
};

export default log;
