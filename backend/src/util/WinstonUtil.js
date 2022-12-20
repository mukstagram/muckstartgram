const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir = 'logs';
const { combine, timestamp, printf } = winston.format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level} ${info.message}`;
})

const Winston = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new winston.transports.Console(),
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true
        })
    ],
})

Winston.stream = {
    // morgan wiston 설정
    write: (message) => {
        Winston.info(message);
    },
};

module.exports = Winston;