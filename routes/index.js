const router = require('express').Router();
const reactionRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes')

router.use('/reaction',reactionRoutes );
router.use('/thought',thoughtRoutes );
router.use('./user', userRoutes)

module.exports = router;