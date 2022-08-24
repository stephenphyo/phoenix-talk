const router = require('express').Router();
const usersCtrl = require('../controllers/users.controller');

/* GET */
router.get('/', usersCtrl.getAllUsers);
router.get('/:id/rooms', usersCtrl.getUserRooms);

/* POST */
router.post('/register', usersCtrl.postRegister);
router.post('/login', usersCtrl.postLogin);

/* PATCH */
router.patch('/:id', usersCtrl.updateUser);

module.exports = router;