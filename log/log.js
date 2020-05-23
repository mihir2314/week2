const winston = require('winston');
global.logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logfile/logfile.log' })
    ]
});