const winston = require(`winston`);
const {combine, timestamp} = winston.format;
const path = require(`path`);
const config = require(`../../config`);

const errors = path.resolve(config.LOG_DIR, `errors.log`);
const combined = path.resolve(config.LOG_DIR, `combined.log`);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(timestamp(), winston.format.json()),
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

logger.add(new winston.transports.File({
  filename: `error.txt`, format: winston.format.simple()
}));

module.exports = logger;
