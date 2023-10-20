import pino from 'pino'
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getLogFile = () => {

  const logsDir = path.join(__dirname, "../logs");
  const logFilePath = path.join(logsDir, "server.log");

  try {
    fs.mkdirSync(logsDir, { recursive: true });
    fs.appendFileSync(logFilePath, "");
    return logFilePath;
  } catch (err) {
    throw err;
  }
}

class Logger {
  constructor() {
    this.pino = pino(
      {
        formatters: {
          level: (label) => {
            return { level: label.toUpperCase() };
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      pino.transport({
        target: 'pino-pretty',
        levels: "info",
        options: {
          destination: getLogFile(),
          colorize: false,
          translateTime: 'SYS:standard',
          nameProps: "name",
          hideObject: false,
          ignore: "pid,hostname,err.name,err.statusCode,msg,err.message",
          messageFormat: '{err.name} {err.statusCode}: {msg}',
        },
      })
    )
  }

  error(error) {
    console.log(error)
    this.pino.error(error)
  }
}

export const loginfo = (msg) => {
  console.log(msg)
  let pinoinfo = pino(
    {
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.transport({
      target: 'pino-pretty',
      levels: "info",
      options: {
        colorize: false,
        destination: getLogFile(),
        translateTime: 'SYS:standard',
        messageFormat: '{msg}',
        ignore: "pid,hostname"
      },
    })
  )
  pinoinfo.info(msg)
}

export default Logger