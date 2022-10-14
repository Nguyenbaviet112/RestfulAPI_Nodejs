import  *  as  winston  from  'winston';
import  'winston-daily-rotate-file';


const { combine, timestamp, label, prettyPrint } = winston.format;
const CATEGORY = "winston custom format";

const transport = new winston.transports.DailyRotateFile({
  filename: 'logger/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '14d'
});


transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
    
  ),
  transports: [transport],
});
export default logger;