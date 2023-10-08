const pino = require('pino');
const path = require("path")

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { destination: path.join(__dirname, "../logs/server.log") },
});

module.exports = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  fileTransport
);