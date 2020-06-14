const authenticateOwner = require('../middlewares/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');
const express = require('express');
const router = express.Router();

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');
const findUser = require('../middlewares/findUser');

router.route('/')
.get(jwtMiddleware({secret: secrets.jwtSecret}),findUser,favoritesController.index)
.post(favoritesController.create);
router.route('/:id')
.delete(favoritesController.find,authenticateOwner,favoritesController.destroy);

module.exports = router;
