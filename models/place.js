const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./Uploader');
const slugify = require('../plugins/slugify');
const Visit = require('./Visit');
//const Place = require('./Place');
let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required :true
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
  slug: {
    type:String,
    unique: true
  },
  address: String,
  _user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
placeSchema.methods.updateImage = function(path, imageType){
  return uploader(path)
  .then(secure_url => this.saveImageUrl(secure_url,imageType));
}
placeSchema.methods.saveImageUrl = function(secureUrl,imageType){
  this[ imageType +'Image'] = secureUrl;
  return this.save();
}
placeSchema.pre('save',function(next){
  if (this.slug) return next();

  generateSlugAndContinue.call(this,0,next);
});

placeSchema.statics.validateSlugCount = function(slug){
  return Place.countDocuments({slug:slug}).then(count=>{
    if (count > 0) return false;
    return true;
  });
}

placeSchema.plugin(mongoosePaginate);

function generateSlugAndContinue(count, next){
  this.slug= slugify(this.title);
  if (count != 0)
      this.slug = this.slug + "-"+ count;
  Place.validateSlugCount(this.slug).then(isValid => {
    if(!isValid)
      return generateSlugAndContinue.call(this,count+1,next);
    next();
  })

}

placeSchema.virtual('visits').get(function() {
    return Visit.find({'_place': this._id}).sort('-id');
});


let Place = mongoose.model('Place',placeSchema);

module.exports= Place;
