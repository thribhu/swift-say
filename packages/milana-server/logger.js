const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const customLevels = {
	trace: 0,
	debug: 1,
	info: 2,
	warn: 3,
	error: 4,
	custom: 5,
};

const customColors = {
	trace: 'gray',
	debug: 'blue',
	info: 'green',
	warn: 'yellow',
	error: 'red',
	custom: 'magenta',
};

const formatTimestamp = () => {
	const indiaTimeZone = 'Asia/Kolkata';
	const now = new Date().toLocaleString('en-US', { timeZone: indiaTimeZone });
	return now;
};
const apacheLogFormat = winston.format.printf(({ timestamp, level, message }) => {
	return `[${timestamp}] [${level}]: ${message}`;
});

const logger = winston.createLogger({
	levels: customLevels,
	format: winston.format.combine(winston.format.timestamp({ format: formatTimestamp }), apacheLogFormat),
	transports: [
		new winston.transports.Console(),
		new DailyRotateFile({
			dirname: 'logs',
			filename: 'application-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxFiles: '30d',
			level: 'error',
		}),
	],
	exitOnError: false,
});

winston.addColors(customColors);

module.exports = logger;
