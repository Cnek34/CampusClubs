const Router = require('express');
const router = new Router();
const applicationController = require('../controllers/applicationController');

router.post('/', applicationController.create)
router.get('/', applicationController.getAll)

module.exports = router;