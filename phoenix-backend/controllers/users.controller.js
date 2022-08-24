const bcrypt = require('bcrypt');

/* Models */
const usersModel = require('../models/users.model');

const usersCtrl = {

    /* GET */
    getUserRooms: (req, res) => {
        usersModel
            .findById(req.params.id)
            .populate({ path: 'rooms', model: 'Room' })
            .exec((err, data) => {
                if (!err) {
                    res.status(200).json({
                        success: true,
                        data: data.rooms
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                }
            })
    },

    getAllUsers: (req, res) => {
        usersModel.find((err, data) => {
            if (!err) {
                res.status(200).json({
                    success: true,
                    count: data.length,
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        })
    },

    /* POST */
    postRegister: async (req, res) => {

        /* Password Hashing */
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { ...req.body, password: hashedPassword };

        usersModel.create(data, (err, data) => {
            if (!err) {
                res.status(201).json({
                    success: true,
                    data: data
                });
            } else {
                if (err.name === 'MongoServerError' && err.code === 11000) {
                    res.status(409).json({
                        success: false,
                        message: 'User already exists'
                    });
                }
                else if (err.name === 'ValidationError') {
                    res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
            }
        })
    },

    postLogin: (req, res) => {
        usersModel.findOne({ email: req.body.email }, (err, data) => {
            if (!err) {
                if (!data) {
                    res.status(404).json({
                        success: false,
                        message: 'User does not exist'
                    });
                }
                else {
                    bcrypt.compare(req.body.password, data.password, (err, success) => {
                        if (success) {
                            res.status(200).json({
                                success: true,
                                data: data
                            });
                        } else {
                            res.status(401).json({
                                success: false,
                                message: 'Incorrect Password'
                            });
                        }
                    });
                }
            }
            else {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        })

    },

    /* PATCH */
    updateUser: (req, res) => {
        usersModel
            .findById(req.params.id)
            .then(user => {
                user.avatar = req.body.avatar;

                user.save((err, data) => {
                    if (!err) {
                        console.log(data)
                    } else {
                        console.log(err.mssage);
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            })

        res.status(200).send('OK');
    },
};

module.exports = usersCtrl;