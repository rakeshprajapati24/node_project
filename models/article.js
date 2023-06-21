var mongoose=require('mongoose');

var artSchema = mongoose.Schema({
    name:String,
    description:String

});

module.exports = mongoose.model('articles',artSchema);