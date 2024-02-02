const mongoose = require('mongoose');
const userschema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    image:{
        public_id:{
            type : String,
            required : true
        },
        url:{
            type : String,
            required : true
        }
    },
    role:{
        type : String,
        default:"user"
    }
})

const usermodel = mongoose.model("users",userschema);
module.exports = usermodel;