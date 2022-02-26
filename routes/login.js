const express = require('express');
const db = require('./db/mysqldb');

const router = express.Router();

// POST
router.post('^/$', (req, res) => {
    db.query(`SELECT email, password FROM Users ` +
                    `WHERE email = '${req.body.email}'`,
        (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                if (rows.length == 0) {
                    res.status(403).send({
                        err: "email",
                        errCode: "Email is not registered"
                    })
                } else {
                    res.status(200).send("OK")
                }
            } else {
                console.log(err);
                res.status(500).send("Error");
            }
        })
    });

module.exports = router;