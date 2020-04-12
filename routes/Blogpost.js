const Blog = require('../models/post');

module.exports = app => {
    app.post('/newPost' , (req,res)=>{
        const { blogpost } = req.body;
        const { email } = req.user;
        const newPost = new Blog({
            blog : blogpost,
            email 
        })
        //req.user.email
        //req.body.blogpost
        newPost.save()
            .then(() => res.redirect('/'))
    })
}