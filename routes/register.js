/* To run this API in AWS Lambda, use 'serverless-mysql' NPM module instead of 'mysql' module */

const express = require('express');
const { v4: uuid } = require('uuid');
const db = require('./db/mysqldb');
const bcrypt = require('bcrypt');

const router = express.Router();

// POST
router.post('^/$', (req, res) => {

    const r = req.body;

    // Generating Salt
    const salt = bcrypt.genSaltSync(10);
    // Hashing Password with Salt (Length = 60)
    const savePwd = bcrypt.hashSync(r.password, salt);

    const query = "INSERT INTO Users VALUES ?";
    var values = [[uuid(), r.firstName, r.lastName, r.username, savePwd, r.email,
                          r.dob, r.gender, salt]];

    // 'values'  is an array of arrays wrapped in an array
    db.query(query, [values],
        (err, rows, fields) => {
            if (!err) {
                res.status(201).send("OK");
            } else {
                res.status(500).send("Internal Server Error");
            }
        }
    );
});

module.exports = router;