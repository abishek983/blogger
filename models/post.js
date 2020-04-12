const mongoose = require('mongoose');
const { Schema } = mongoose;

const post = new Schema({
    blog :{
        required:true,
        type:String
    },
    email :{
        required:true,
        type:String
    }
})

const newPost = mongoose.model('blogpost', post);

module.exports = newPost;
