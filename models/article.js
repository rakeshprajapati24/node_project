var mongoose=require('mongoose');


var artSchema = mongoose.Schema({
    name:String,
    description:String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

});

module.exports = mongoose.model('Article',artSchema);