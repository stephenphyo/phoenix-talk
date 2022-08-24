const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9000';
const API = axios.create({
    baseURL: API_URL
});

module.exports = API;