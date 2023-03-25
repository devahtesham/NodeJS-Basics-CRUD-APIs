// schema means organization, standard,architecture or parameters of data you want to store on DB
/*
 we want to store our user data with the following parameters
    name,
    age,
    gender
    email,
    isActive
*/
const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    isActive:{
        type:Boolean
    }
})

// now we create a model for user
const userModel = mongoose.model("user",schema)

//then export it
module.exports = userModel