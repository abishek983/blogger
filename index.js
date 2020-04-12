const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURI = require('./mongodb').mongoURI;
const passport = require('passport');

const app = express();
app.listen(8080, () => console.log('Server running on 8080'));

//EJS
app.set('view engine','ejs');

//passport config
require('./passport-stratergy/passport')(passport);

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connecting to mongoDB atlas
mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

//passport initialize
app.use(passport.initialize());
app.use(passport.session());    

//routes
require('./routes/SignUp')(app);
require('./routes/Login')(app);

app.get('/' , (req,res)=>{
    res.render('login');
})
