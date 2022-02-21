/* To run this API in AWS Lambda, use 'serverless-mysql' NPM module instead of 'mysql' module */

const express = require('express');
const mysql = require('mysql');
const { v4: uuid } = require('uuid');

const router = express.Router();

/* MySQL CONNECTION */
var mysqlConn = mysql.createConnection({
    host: 'mysql.stephenphyo.com',
    user: 'stephenphyo',
    password: 'ALPHAbetagammatango@123',
    database: 'PHOENIX_TALK'
});

mysqlConn.connect ((err) => {
    if (!err) {
        console.log("Database Connection Successful");
    }
});

router.post('^/$', (req, res) => {
    mysqlConn.query(`INSERT INTO Users ` +
                                `VALUES (` +
                                    `'${req.body.firstName}', '${req.body.lastName}', ` +
                                    `'${req.body.username}', '${req.body.password}', ` +
                                    `'${req.body.email}', '${uuid()}' ` +
                                `)`,
        (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                res.status(201).send("OK");
            } else {
                res.status(500).send("Internal Server Error");
                console.log(err);
            }
        }
    );
});

module.exports = router;