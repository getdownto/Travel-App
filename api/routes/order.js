const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.order.get.all);

router.get('/:id', controllers.order.get.single);

router.post('/', auth(), controllers.order.post);

router.put('/:id', auth(), controllers.order.put);

router.delete('/:id', auth(), controllers.order.delete);

module.exports = router;