var User = require('../models/user.js')
const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
  });
  
const upload = multer({ storage: storage });

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

const uploadfile = async (res ,req) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
      }
    
      const imagePath = req.file.path;
      // Process the image or save its path to the database
    
      res.send('Image uploaded successfully.');
};

const createUser = async (req , res) => {
    if (req.file) {
        console.log('File uploaded:', req.file);
        // Process the file as needed (e.g., save it to the database)
    }
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        image:filename,
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

const deleteUser = async (res,req) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');

};



module.exports = {getAllUsers,addUser,createUser,editUser,updateUser,deleteUser,uploadfile};