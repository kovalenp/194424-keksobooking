const winston = require(`winston`);
const {combine, timestamp, prettyPrint} = winston.format;
const path = require(`path`);
const config = require(`../../config`);

const errors = path.resolve(config.LOG_DIR, `errors.log`);
const combined = path.resolve(config.LOG_DIR, `combined.log`);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.File({filename: errors, level: `error`}),
    new winston.transports.File({filename: combined})
  ]
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
