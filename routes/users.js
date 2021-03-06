const usersController = require('../controllers/UsersController');
const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/SessionsController');

router.route('/')
.post(usersController.create,
      sessionsController.generateToken,
      sessionsController.sendToken)
.get(usersController.myPlaces);

module.exports = router;
