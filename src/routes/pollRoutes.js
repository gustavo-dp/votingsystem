const router = require('express').Router();
const controller = require('../controllers/pollController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.post('/:id/vote', controller.vote);

module.exports = router;