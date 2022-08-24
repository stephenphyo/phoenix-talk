const Pusher = require('pusher');
require('dotenv').config();

// const pusher = new Pusher({
//     appId: "1466550",
//     key: "41746b86dd713916b811",
//     secret: process.env.PUSHER_SECRET_KEY,
//     cluster: "us2",
//     useTLS: true
// });

// pusher.trigger('room', 'new', { data: 'hey'})

console.log(process.env.PUSHER_SECRET_KEY)

module.exports = pusher;