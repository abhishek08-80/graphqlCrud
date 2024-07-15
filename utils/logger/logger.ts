import shortid from 'shortid';
import { createNamespace, getNamespace } from 'cls-hooked';
import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file';
const namespaceName = 'logger';
const namespace = getNamespace(namespaceName) || createNamespace(namespaceName);

const logsPath = `${process.cwd()}/logger/logs/`;

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    let log = '';
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : shortid.generate();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return log;
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
      return 'Error formatting log';
    }
  }),
);

// Create the logger
const infoLogger = createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      filename: `${logsPath}/info-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 100000, // 5MB
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: fileFormat,
  transports: [
    new transports.DailyRotateFile({
      level: 'error',
      filename: `${logsPath}/error-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, // 5MB
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info: any) => {
    let log = '';
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : shortid.generate();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return log;
    } catch (error) {
      console.log('Error @ consoleFormat @ logger ', error);
      return 'Error formatting log';
    }
  }),
);

if (process.env.NODE_ENV !== 'production') {
  infoLogger.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
  errorLogger.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
}

const logger = {
  info: async (msg: string, ...args: any[]) => {
    infoLogger.info(msg, ...args);
  },
  error: async (msg: string, ...args: any[]) => {
    errorLogger.error(msg, ...args);
  },
};

export default logger;
