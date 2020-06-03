const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    requerid :true
  },
  description: String,
  acceptsCreditCard: {
    type: Boolean,
    default: false,
  },
  coverImage: {
    type: String
  },
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
  slug: String
});

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place',placeSchema);

module.exports= Place;
