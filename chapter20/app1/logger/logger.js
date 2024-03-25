// winston logger
const { format, createLogger, transports } = require('winston');
// DailyRotateFile transport
require('winston-daily-rotate-file');
// MongoDB transport
require('winston-mongodb');
// Load environment variables
require('dotenv').config();
// Define the custom logger
const { combine, timestamp, label, prettyPrint } = format
// Define the file transport
const fileRotateTransport = new transports.DailyRotateFile({
  level: "info",
  filename: "logs/info-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles:"10d"
})
// Define the logger
const logger = createLogger({
  level: "debug",
  format: combine (
    label({label: "Logs for Users Products App"}),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss"
    }),
    format.json(),
    // prettyPrint()
  ),
  transports: [
    new transports.Console(),
    // new transports.File({
    //   filename: "logs/example.log"
    // }),
    new transports.File({
      level: "error",
      filename: "logs/error.log"
    }),
    new transports.File({
      level: "info",
      filename: "logs/info.log"
    }),
    fileRotateTransport,
    new transports.MongoDB({
      level: "debug",
      db: process.env.MONGODB_URI,
      options: {
        useUnifiedTopology: true
      },
      collection: "server_logs",
      format: format.combine(
        format.timestamp(),
        format.json()
      )
    })
  ]
})
// Export the logger
module.exports = logger;