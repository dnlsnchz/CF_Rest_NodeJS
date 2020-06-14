const mongoose = require('mongoose');

const dbName = 'places_facilito_api'
const port = '27017';
module.exports = {
  //connect :()=> mongoose.connect('mongodb://localhost:27017/'+dbName),
  //, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true}
  connect: ()=> mongoose.connect('mongodb://localhost:'+port+'/'+dbName, {useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true}),

  dbName,
  connection : () =>{
    if (mongoose.connection) {
      return mongoose.connection;
    }
    return this.connect();
  }
}
