const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        avatar: { type: String },
        avatar_decoration: { type: String, default: null },
        type: { type: Number, required: true, default: 0 }, // 0 = Public, 1 = Private
        members: [{
            member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            joined_at: { type: Date, default: Date.now }
        }],
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
        settings: { type: Object },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('Room', roomsSchema);