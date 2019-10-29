import pino from 'pino';
import pinoHttp from 'pino-http';
import config from '../../config/env.js';

const logger = pino({
  level: 'debug',
  base: null,
  useLevelLabels: !config.GAE_ENV,
  prettyPrint: config.GAE_ENV
    ? false
    : { colorize: true, levelFirst: true, timestampKey: 'SYS:standard' },
});

const requestLogger = pinoHttp({
  logger,
  customLogLevel: (res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    }
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    return 'info';
  },
  serializers: {
    req: ({ id, method, url }) => ({ id, method, url }),
    res: ({ statusCode, payload }) => ({ statusCode, payload }),
  },
});

export default {
  requestLogger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
};
