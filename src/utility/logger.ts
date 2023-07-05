import logger from "pino";
import pretty from 'pino-pretty'
const log = logger({
    base: {
      pid: false,
    },
    prettifier: pretty
  });
  
  export default log;