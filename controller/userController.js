var User = require('../models/user.js')
const multer = require('multer');
const Joi = require('joi');
const upload = multer({ dest: 'uploads/' });
const ExcelJS = require('exceljs');
const transporter = require('../emailConfig');



// const getAllUsers = async (req , res) =>{
//     User.find({}).exec()
//         .then((results) => {
//             res.render('show',{users:results});
//         })
//         .catch((error) => {
//            
//         });

// };

// const getAllUsers = async (req, res) => {
//     const page = req.query.page || 1; 
//     const limit = req.query.limit || 2; 
//     User.paginate({}, { page, limit })
//       .then((result) => {
//         res.render('show', { users: result.docs, pageInfo: result }); 
//       })
//       .catch((error) => {
        
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//       });
// };



const getAllUsers = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const searchQuery = req.query.search || ''; 

    const searchFilter = {
        $or: [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { email: { $regex: new RegExp(searchQuery, 'i') } },
        ],
    };

    try {
        const users = await User.paginate(searchFilter, { page, limit });

        res.render('show', { users: users.docs, pageInfo: users, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const downloadexcel = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    User.paginate({}, { page, limit })
        .then((result) => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'Name', key: 'name' },
            { header: 'Email', key: 'email' },
        ];

        result.docs.forEach((user) => {
            worksheet.addRow({ name: user.name, email: user.email });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="users.xlsx"');

        workbook.xlsx.write(res).then(() => {
            res.end();
        });
        })
        .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
};

const addUser = async (req ,res) =>{
    
    res.render('insert');

};



// const createUser = async (req , res) => {
    
//     var user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password,
//     });

//     user.save()
//         .then(() => {
//             res.redirect('/');
//         })
//         .catch((error) => {
//             console.log(error)
//         }); 
// };

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    const user = new User({
      name,
      email,
      password,
    });
  
    try {
      await user.save();
  
      const mailOptions = {
        from: 'contact@theadroithr.com', 
        to: email,
        subject: 'Welcome to Our App',
        text: `Hello ${name},\n\nWelcome to our app! Your account has been successfully created.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
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


const showUser = async (req ,res) =>{
    await User.findById(req.params.id)
        .then((results) => {
            res.render('user_show_page',{user:results});
        })
        .catch((error) => {
            // Handle query error
        });

};


module.exports = {getAllUsers,addUser,createUser,editUser,updateUser,removeUser,showUser,downloadexcel};