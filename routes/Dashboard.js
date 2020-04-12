const blog = require('../models/post');

module.exports = app => {
    app.get('/' , async (req,res)=>{
    if(req.user){
        const data = await blog.find()
        res.render('dashboard', {data});
    }
    else    
        res.redirect('/login');
    })
}