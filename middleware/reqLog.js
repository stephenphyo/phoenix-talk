const logger = require('./logger');

const reqLog = (req, res, next) => {
    let logFilePrefix = 'log';
    let logMessage = `${req.method}\t${req.url}\t${req.headers.origin}`;
    logger(logFilePrefix, logMessage);
    next();
}

module.exports = reqLog;