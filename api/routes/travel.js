const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.travel.get.all);

router.get('/:id', controllers.travel.get.single);

router.post('/', auth(), controllers.travel.post);

router.put('/:id', auth(), controllers.travel.put);

router.delete('/:id', auth(), controllers.travel.delete);

module.exports = router;