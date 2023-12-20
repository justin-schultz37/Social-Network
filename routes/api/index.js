// API routes are centralized here
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// the root path for users and thoughts after api/
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;