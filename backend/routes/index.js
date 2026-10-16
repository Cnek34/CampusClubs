const Router = require('express');
const router = new Router();

const applicationRouter = require('./applicationRouter');
const membershipRouter = require('./membershipRouter');
const organizationRouter = require('./organizationRouter');
const userRouter = require('./userRouter');

router.use('/user', userRouter)
router.use('/membership', membershipRouter)
router.use('/organization', organizationRouter)
router.use('/application', applicationRouter)

module.exports = router;