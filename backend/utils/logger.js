import pino from 'pino'
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getLogFile() {

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

export default pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.transport({
    target: 'pino/file',
    options: { destination: getLogFile() },
  })
);