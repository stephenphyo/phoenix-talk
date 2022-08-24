const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    type: { type: Number, default: 0 }, // 0 = Text, 1 = Reply, 2 = Join
    ref_message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
    status: { type: Number }, /* 0 = Sent, 1 = Delivered, 2 = Seen */
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messagesSchema);