const Register = require('../models/register');
const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.post('/register' , (req,res)=>{
        const { email , password } = req.body;
        const newUser = new Register({
            email,
            password
        })
        if(!email || !password){
            res.send({failed : "enter all fields"})
        }
        //if the user already exists
        Register.findOne({email : email})
            .then(user => {
                if(user){
                    res.send({message : "User already exists"})
                }
                else{
                    bcrypt.genSalt(10 , (err,salt) => 
                        bcrypt.hash(newUser.password,salt, (err,hash) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                newUser.password = hash
                                newUser.save()
                                    .then(()=> console.log("User added successfully"))
                                    .catch(err => console.log(err))
                                res.send({message : "User added Succesfully"})
                            }
                        })
                    )    
                }
            })

    })

    app.get('/register', (req,res)=>{
        res.render('signup');
    })
}