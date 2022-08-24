const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, default: '' },
        avatar_decoration: { type: String, default: null },
        rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
        friends: [ { name: { type: String } } ],
        online: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

module.exports = mongoose.model('User', usersSchema);