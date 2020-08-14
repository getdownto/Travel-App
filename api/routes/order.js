const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', auth(), controllers.order.get.all);

router.get('/:id', auth(), controllers.order.get.single);

router.post('/', auth(), controllers.order.post);

router.put('/:id', auth(), controllers.order.put);

router.delete('/:id', auth(), controllers.order.delete);

module.exports = router;