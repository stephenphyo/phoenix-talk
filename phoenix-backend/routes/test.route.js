const testCtrl = require('../controllers/test.controller');
const router = require('express').Router();

/* GET */
router.get('/owners/:id/items', testCtrl.getItems);
router.get('/owners', testCtrl.getOwners);

/* POST */
router.post('/owners/:id/items/new', testCtrl.postItem);
router.post('/owners/new', testCtrl.postOwner);

module.exports = router;