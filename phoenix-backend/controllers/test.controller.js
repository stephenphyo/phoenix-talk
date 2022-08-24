const itemModel = require('../models/test.item.model');
const ownerModel = require('../models/test.owner.model');

const testCtrl = {
    getItems: (req, res) => {
        itemModel.find().populate({ path: 'owner', model: 'Owner' });
        res.status(200).json(data);
    },

    getOwners: (req, res) => {

    },

    postItem: (req, res) => {
        itemModel.create({
            itemName: req.body.itemName,
            owner: req.params.id
        }, (err) => {
            if (!err) {
                res.status(201).json({
                    data: {
                        itemName: req.body.itemName,
                        owner: req.params.id
                    }
                })
            } else {
                res.status(500).json({
                    message: err.message
                })
            }
        })

    },

    postOwner: (req, res) => {
        ownerModel.create({
            name: req.body.name,
            email: req.body.email,
        }, (err, data) => {
            if (!err) {
                res.status(201).json({ data: data.id })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
    }
};

module.exports = testCtrl;