const LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt =require('bcrypt');

const User = require('../models/register');

module.exports = passport =>{
    passport.use(
        new LocalStratergy({ usernameField: 'email'}, (email,password,done) =>{
            //match username
            User.findOne({email : email})
                .then(user => {
                    if(!user){
                        return done(null, false, {msg : 'user not registered'})
                    }
                    //match password
                    bcrypt.compare(password, user.password, (err , isMatch) =>{
                        if(err)
                            throw err;
                        if(isMatch){
                            return done(null, user);
                        }
                        else{
                            return done(null, false, {msg : 'password incorrect'});
                        }
                    })
                })
                .catch( err => console.log(err));
        })
    )
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user) =>{
          done(err, user);
        });
    });
}



