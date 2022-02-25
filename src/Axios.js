const axios = require("axios");

const instance = axios.create({
    baseURL: "http://loginapi.stephenphyo.com:9010"
});

module.exports = instance;