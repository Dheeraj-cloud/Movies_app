const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
     Title:{
       type:String
     },
     Year:{
        type:String
     },
     Runtime:{
        type:String
     },
     Country:{
        type:String
    },
    Genre:{
      type:String
    }, 
    pics:{
        type:String
    }

})

module.exports = mongoose.model('Movies',MoviesSchema)
