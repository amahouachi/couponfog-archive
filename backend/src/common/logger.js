const winston = require('winston');
require('winston-daily-rotate-file');
const rfs = require('rotating-file-stream');
const {config}= require(`./config.js`);
const AWS= require('aws-sdk');
AWS.config.update({region: config.aws.region});
const SNS= new AWS.SNS({apiVersion: '2010-03-31'});

const errorTransport = new (winston.transports.DailyRotateFile)({
  level: 'warn',
  filename: `${config.logDir}/error/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d',
  colorize: false,
  handleExceptions: true
});
const debugTransport = new (winston.transports.DailyRotateFile)({
  level: 'debug',
  filename: `${config.logDir}/debug/debug-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '14d',
  colorize: false
});
const consoleTransport = new (winston.transports.Console)({
  level: 'debug',
  json: false,
  colorize: true,
});

const winstonOptions= {
  transports: [errorTransport],
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((info) => {
        return `${info.timestamp} - [${info.level}]: ${info.message}`;
      })
  ),
  exitOnError: false,
};
if(config.environment==='dev'){
  winstonOptions.transports= [consoleTransport];
}
winstonOptions.transports.push(debugTransport);
const logger= {
  crit: async (subject, message) => {
    logger.winston.error(message);
    try{
      await sendAppAlert(subject, message);
    }catch (e) {
      logger.error("Sending app alert failed => "+e);
    }
  },
  error: (message) => {
    logger.winston.error(message);
  },
  warn: (message) => {
    logger.winston.warn(message);
  },
  info: (message) => {
    logger.winston.info(message);
  },
  debug: (message) => {
    if(config.debug){
      logger.winston.debug(message);
    }
  },
  winston: new winston.createLogger(winstonOptions)
};

async function sendAppAlert(subject,message){
  const alert= {
    Subject: subject,
    Message: message,
    TopicArn: config.aws.topics[config.currentApp]
  };
  return await SNS.publish(alert).promise();
}
function createAccessLogStream({filename="access.log", size="10M", interval="1d", compress= true}){
  return rfs.createStream(filename, {
    size,
    interval,
    compress,
    path: `${config.logDir}/access`
  });
}
function getAccessLogFormat(){
  return ':date[iso] - :remote-addr - :method :url :status :res[content-length] - :response-time ms';
}

exports.logger = logger;
exports.createAccessLogStream= createAccessLogStream;
exports.getAccessLogFormat= getAccessLogFormat;
exports.sendAppAlert= sendAppAlert;
