var mongoose=require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var newSchema = mongoose.Schema({
    name: {
        type : String,
        required: [true, "only characters are allowed"],
        unique: [true,"alreday present"],
    },
    email:String,
    password:String,
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
    
});
newSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('users',newSchema);