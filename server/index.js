//Imports
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');


//Using Express-Session for Cookies
app.use(session({
  secret: 'adsasdasdaqioej3e',
  saveUninitialized:false,
  resave:false
}))

//Using Global Promise
mongoose.Promise = Promise
mongoose.connect('mongodb://admin:password123@ds261470.mlab.com:61470/holition')
.then(()=> console.log('Mongoose connection successful!'))

const User = require('./models/users')

//Using Body-Parser Middleware
app.use(bodyParser.json())


// POST For Login API/Login Route
app.post('/api/login', async (req, res)=>{

  const {email, password} = req.body;
  console.log(email, password);
  const resp = await User.findOne({email, password })
  {
    if(!resp){
      res.json({
        success:false,
        message:'Incorrect Credentials'
      })
    }
    else{
      res.json({
        success:true,
        message:'Logging in'
      })

      req.session.user = email
      console.log('Loggin you in')
    }
  }

});


//GET Request
app.get('/data', (req,res)=>{
  res.send('User is ', + req.session.user);
})


//POST For API/Register Route
app.post('/api/register',  async (req, res) => {
const {email, password} = req.body

const existingUser = await User.findOne({email})

if(existingUser) {

  res.json({
    success:false,
    message:'Email already in use'
  })
  return
}
const user = new User({
    email,
    password
  })

const result = await user.save()
console.log(result)
res.json({
success:true,
message:"Successfully Logged In!"

})

});


//Server Port Configurations
const PORT = 1234;
app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`);
});
