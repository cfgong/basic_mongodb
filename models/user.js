const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String, 
    password: String
})

userSchema.pre('save', function(next){
    var hash = bcrypt.hashSync(this.passowrd, 8);
    this.password = hash; 
    next();
})
const User = mongoose.model('User', userSchema);
module.exports = User; 