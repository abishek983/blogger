const passport = require('passport');

module.exports = app =>{
    app.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
        res.send(req.user);
    });
    app.get('/login' , (req,res)=>{
        if(req.user)
            res.send("logged in");
        else    
            res.redirect('login');
    })
}