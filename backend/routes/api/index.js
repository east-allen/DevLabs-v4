const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

const usersRouter = require('./users.js');
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/spots', spotsRouter);
router.use('/properties', spotsRouter); // Alias for spots
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;