import pino from 'pino';
import pinoHttp from 'pino-http';
import pinoStackdriver from 'pino-stackdriver';
import pinoms from 'pino-multi-stream';
import config from '../../config/env.js';

let stream;
if (config.GAE_ENV) {
  const writeStream = pinoStackdriver.createWriteStream({
    projectId: 'slack-reaction-242111',
    resource: { type: 'gae_app' },
  });
  stream = pinoms.multistream([
    { stream: writeStream },
  ]);
}

const logger = pino({
  level: 'debug',
  base: null,
  useLevelLabels: !config.GAE_ENV,
  prettyPrint: config.GAE_ENV
    ? false
    : { colorize: true, levelFirst: true, timestampKey: 'SYS:standard' },
}, stream);

// Logger to capture all requests/responses and output them to the console\stackDrive.
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
}, stream);

export default {
  requestLogger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
};
