var express = require('express');
var app = express();
var mangoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var User = require('./models/index.js')
var Article = require('./models/article.js')

mangoose.connect("mongodb://localhost:27017/crud",{ useUnifiedTopology: true, useNewUrlParser:true});
var connection = mangoose.connection;
connection.once('open',function(){
    console.log('db connected')
});

app.set('view engine','ejs');



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


app.get('/', function(req , res) {
    res.render('insert');
});

app.post('/insert',function(req ,res){

    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    user.save()
        .then(() => {
            res.redirect('/show');
        })
        .catch((error) => {
            // Handle save operation error
        }); 
    
});

app.get('/show',function(req,res){
    User.find({}).exec()
        .then((results) => {
            res.render('show',{users:results});
        })
        .catch((error) => {
            // Handle query error
        });
    
});
app.get('/delete/:id',async function(req,res){
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/show');
});

app.get('/edit/:id',async function(req,res){
    await User.findById(req.params.id)
            .then((results) => {
                res.render('edit',{user:results});
            })
            .catch((error) => {
                // Handle query error
            });
    });
app.post('/update/:id', async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.redirect('/show')
})
var server = app.listen(4000, function(){
    console.log('port no 4000');
});