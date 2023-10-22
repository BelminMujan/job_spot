import pino from 'pino'
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import { type } from 'os';
import { AppError } from './Error.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logger = pino(
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
    options: {
      colorize: false,
      destination: getLogFile(),
      translateTime: 'SYS:standard',
      nameProps: "name",
      hideObject: false,
      ignore: "pid,hostname,err.name,err.statusCode,msg,err.message",
      messageFormat: '{err.name} {err.statusCode}: {msg}',
    },
  })
)

function getLogFile() {
  try {
    const logsDir = path.join(__dirname, "../logs").toString();
    const logFilePath = path.join(logsDir, "server.log").toString();
    fs.mkdirSync(logsDir, { recursive: true });

    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, "");
    } else if (!fs.accessSync(logFilePath, fs.constants.W_OK)) {
      fs.chmodSync(logFilePath, 0o666);
    }

    return logFilePath.toString();
  } catch (err) {
    throw err;
  }
}
export default function log(msg) {
  if (msg instanceof AppError) {
    logger.error(msg)
  } else {
    logger.info(msg)
  }
  console.log(msg)
}
