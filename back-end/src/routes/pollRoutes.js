const router = require('express').Router();
const controller = require('../controllers/pollController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/:id/options', controller.getOptionsById);
router.get('/:id/results', controller.getVoteResults);

router.post('/', verifyToken, controller.create);
router.post('/:id/vote', verifyToken, controller.vote);

module.exports = router;