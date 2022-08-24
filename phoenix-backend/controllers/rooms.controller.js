/* Models */
const roomsModel = require('../models/rooms.model');
const messagesModel = require('../models/messages.rooms.model');
const usersModel = require('../models/users.model');

const roomsCtrl = {

    /* GET */
    getAllRooms: (req, res) => {
        roomsModel
            .find()
            .populate({ path: 'creator', model: 'User' })
            .populate({ path: 'messages', model: 'Message' })
            .exec((err, data) => {
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

    getRoomMessages: (req, res) => {
        roomsModel
            .findById(req.params.id)
            .populate({
                path: 'messages',
                populate: { path: 'author', model:'User' }
            })
            .exec((err, data) => {
                if (!err) {
                    res.status(200).json({
                        success: true,
                        count: data.messages.length,
                        data: data.messages
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        messsage: err.message
                    })
                }
        })
    },

    /* POST */
    postNewRoom: (req, res) => {
        roomsModel.create(req.body, (err, room) => {
            if (!err) {
                usersModel
                    .findByIdAndUpdate(
                        req.body.creator,
                        { $push: { rooms: room.id } }
                    )
                    .exec((err) => {
                        if (!err) {
                            res.status(201).json({
                                success: true,
                                data: req.body
                            })
                        } else {
                            res.status(500).json({
                                success: false,
                                message: err.message
                            })
                        }
                    })
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        })
    },

    postNewMessage: (req, res) => {
        messagesModel.create({
            ...req.body,
            room_id: req.params.id
        }, (err, msg) => {
            if (!err) {
                roomsModel
                    .findByIdAndUpdate(
                        req.params.id,
                        { $push: { messages: msg.id } }
                    )
                    .exec((err) => {
                        if (!err) {
                            res.status(201).json({
                                success: true,
                                data: msg
                            })
                        } else {
                            res.status(400).json({
                                success: false,
                                message: err.message
                            })
                        }
                    })
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
        })
    },

    postNewMember: (req, res) => {
        roomsModel
            .findByIdAndUpdate(
                req.params.id,
                {
                    $push: {
                        members: { member: req.body.member }
                    }
                }
        )
            .exec((err, data) => {
                if (!err) {
                    res.status(201).json({
                        success: true,
                        data: data
                    })
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: err.message
                    })
                }
        })
    },
};

module.exports = roomsCtrl;