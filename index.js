var express = require('express');
var app = express();
const multer = require('multer');

var mangoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const user_route = require("./routes/user");

var User = require('./models/user.js')
var Article = require('./models/article.js')

mangoose.connect("mongodb://localhost:27017/crud",{ useUnifiedTopology: true, useNewUrlParser:true});
var connection = mangoose.connection;
connection.once('open',function(){
    console.log('db connected')
});

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

app.set('view engine','ejs');

app.use('/',user_route);

app.use('/new',user_route);
app.use('/insert',user_route);
app.use('/edit/:id',user_route);
app.use('/edit/:id',user_route);
app.use('/delete/:id',user_route);






app.get('/article',function(req ,res){
    res.render('new');
})

app.post('/create',function(req ,res){

    var article = new Article({
        name:req.body.name,
        description:req.body.description
    });

    article.save()
        .then(() => {
            res.redirect('/article_show');
        })
        .catch((error) => {
            // Handle save operation error
        }); 
    
});

app.get('/article_show',function(req,res){
    Article.find({}).exec()
        .then((results) => {
            res.render('article_show',{arts:results});
        })
        .catch((error) => {
            // Handle query error
        });
    
});

app.get('/art_delete/:id',async function(req,res){
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/article_show');
});


// app.get('/', function(req , res) {
//     res.render('insert');
// });





// app.post('/insert',function(req ,res){

//     var user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//     });

//     user.save()
//         .then(() => {
//             res.redirect('/show');
//         })
//         .catch((error) => {
//             // Handle save operation error
//         }); 
    
// });

// app.get('/show',function(req,res){
//     User.find({}).exec()
//         .then((results) => {
//             res.render('show',{users:results});
//         })
//         .catch((error) => {
//             // Handle query error
//         });
    
// });
// app.get('/delete/:id',async function(req,res){
//     await User.findByIdAndDelete(req.params.id);
//     res.redirect('/');
// });

// app.get('/edit/:id',async function(req,res){
//     await User.findById(req.params.id)
//         .then((results) => {
//             res.render('edit',{user:results});
//         })
//         .catch((error) => {
//             // Handle query error
//         });
// });
// app.post('/update/:id', async function(req,res){
//     await User.findByIdAndUpdate(req.params.id,req.body)
//     res.redirect('/show')
// })
var server = app.listen(4000, function(){
    console.log('port no 4000');
});