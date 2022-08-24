const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

module.exports = mongoose.model('Owner', ownerSchema);