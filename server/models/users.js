//IMPORTS
const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: String,
  password: String,
  toDo: {type:String, default:"Nothing on the list"}

});

const User = mongoose.model('User', UserSchema);

module.exports= User
