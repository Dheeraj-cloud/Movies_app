const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
})


module.exports = mongoose.model('Users',UserSchema);