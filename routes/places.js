const express = require('express');
const placesController = require('../controllers/PlacesController');

let router = express.Router();
router.route('/')
.get(placesController.index)
.post(placesController.multerMiddleware(),
  placesController.create,
  placesController.saveImage);

router.route('/:id')
.get(placesController.find,placesController.show)
.put(placesController.find,placesController.update)
.delete(placesController.find,placesController.destroy);


module.exports= router;
