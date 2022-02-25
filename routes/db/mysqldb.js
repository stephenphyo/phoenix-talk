const mysql = require('mysql');

/* MySQL CONNECTION */
var mysqlConn = mysql.createConnection(require('./db_settings.json'));

mysqlConn.connect ((err) => {
    if (!err) {
        console.log("Database Connection Successful");
    }
});

module.exports = mysqlConn;