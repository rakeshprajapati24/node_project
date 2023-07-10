var User = require('../models/user.js')
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });



const getAllUsers = async (req , res) =>{
    User.find({}).exec()
        .then((results) => {
            res.render('show',{users:results});
        })
        .catch((error) => {
            // Handle query error
        });

};

const addUser = async (req ,res) =>{
    
    res.render('insert');

};



const createUser = async (req , res) => {
    
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });

    user.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            // Handle save operation error
        }); 
};

const editUser = async (req ,res) =>{
    await User.findById(req.params.id)
        .then((results) => {
            res.render('edit',{user:results});
        })
        .catch((error) => {
            // Handle query error
        });

};

const updateUser = async (req ,res) => {
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/');
};

const removeUser = async (req , res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');

};



module.exports = {getAllUsers,addUser,createUser,editUser,updateUser,removeUser};