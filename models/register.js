const mongooes = require('mongoose');
const { Schema } = mongooes;

const newUser = new Schema({
    email : {
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true
    }
})

const user = mongooes.model('register' , newUser);
module.exports = user;