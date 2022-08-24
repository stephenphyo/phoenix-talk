const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }
});

module.exports = mongoose.model('Item', itemSchema);