const router = require('express').Router();
const controller = require('../controllers/pollController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id/options', controller.getOptionsById);
router.get('/:id/results', controller.getVoteResults);
router.post('/', controller.create);
router.post('/:id/vote', controller.vote);

module.exports = router;