const Place = require('../models/Place');
const upload = require('../config/upload')
const uploader = require('../models/Uploader');
const helpers = require('./helpers');

const validParams = ['title','description','acceptsCreditCard','openHour' ,'closeHour', 'address']
function find(req,res,next){
  //console.log('req.body',req);
  //Place.findById(req.params.id)
  Place.findOne({slug : req.params.id})
  .then(place => {
    req.place = place;
    req.mainObj = place;
    next();
  }).catch(err=>{
    next(err);
  })
}

function index(req,res){
  Place.paginate({},{
    page: req.query.page || 1 ,
    limit: 8,
    sort: {'_id':-1}
  }).then(docs=>{
    res.json(docs);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
};
function create (req,res,next){
    const params = helpers.paramsBuilder(validParams, req.body);
    console.log('req.user.id',req.user.id);
    params['_user'] = req.user.id;
    Place.create(params)
      .then(doc => {
        req.place = doc;
        //res.json(doc);
        next();
      }).catch(err=>{
        next(err);
        //console.log(err);
        //res.json(err);
      });
};
function show (req,res){
  //Place.findOne({})
  res.json(req.place);
  /*Place.findById(req.params.id)
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
  */
};
function update (req,res){
  const params = helpers.paramsBuilder(validParams, req.body);
  req.place = Object.assign(req.place,params);

  req.place.save()
  //Place.findByIdAndUpdate(req.params.id,placeParams,{new:true})
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });

};
function destroy (req,res){
  //Place.findByIdAndRemove(req.params.id)
  req.place.remove()
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });

};

function multerMiddleware(){
  //upload.single
  return upload.fields([
    {name: 'avatar', maxCount : 1},
    {name: 'cover', maxCount: 1}
  ]);
}

function saveImage(req,res){
  if (req.place) {
    const files = ['avatar','cover'];
    const promises = [];

    files.forEach(imageType => {
      if (req.files && req.files[imageType]) {
        const path = req.files[imageType][0].path;
        promises.push(req.place.updateImage(path,imageType));
      }
    });

    Promise.all(promises).then(results =>{
      console.log(results);
      res.json(req.place);
    }).catch(err=> {
      console.log(err);
      res.json(err);
    })

  }else {
    res.status(422).json({
      error: req.error || 'Could not save place'
    })

  }

}

module.exports = {
  index,
  create,
  show,
  update,
  destroy,
  find,
  multerMiddleware,
  saveImage
};
