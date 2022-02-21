// { method: alias} = require (module)
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const PATH = require("path");
const FS = require("fs");
const FSPromise = require("fs").promises;

const logEvents = async (logFilePrefix, logMessage) => {
    let dateTime = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
    let log = `${dateTime}\t${uuid()}\t${logMessage}\n`;
    try {
        if (!FS.existsSync(PATH.join(__dirname, '..', 'logs'))) {
            await FSPromise.mkdir(PATH.join(__dirname, '..', 'logs'));
        }
        await FSPromise.appendFile(
            PATH.join(__dirname, '..', 'logs', `${logFilePrefix}-${format(new Date(), 'yyyy-MM-dd')}`), log
            );
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents;