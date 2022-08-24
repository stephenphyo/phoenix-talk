const router = require('express').Router();
const roomsCtrl = require('../controllers/rooms.controller');

/* GET */
router.get('/', roomsCtrl.getAllRooms);
router.get('/:id/messages', roomsCtrl.getRoomMessages);

/* POST */
router.post('/new', roomsCtrl.postNewRoom);
router.post('/:id/messages/new', roomsCtrl.postNewMessage);
router.post('/:id/members/new', roomsCtrl.postNewMember);

module.exports = router;