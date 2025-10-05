const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/conversations');

router.post('/open', ctrl.openConv);
router.get('/', ctrl.listConv);
router.get('/:id/messages', ctrl.getMessages);

module.exports = router;
