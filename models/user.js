var mongoose=require('mongoose');

var newSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,

});

module.exports = mongoose.model('users',newSchema);