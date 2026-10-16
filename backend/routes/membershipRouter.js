const Router = require('express');
const router = new Router();
const membershipController = require('../controllers/membershipController');

router.post('/', membershipController.create)
router.get('/:organizationId', membershipController.getAll)
router.get('/:organizationId/:userId', membershipController.getOne)

module.exports = router;