const article = require('../models/article.js');
var Article = require('../models/article.js')
var User = require('../models/user.js')


const getAllArticles = async (req , res) =>{
    Article.find({}).exec()
        .then((results) => {
            res.render('article_show',{articles:results});
        })
        .catch((error) => {
            // Handle query error
        });

};

const addArticle = async (req ,res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.render('article_new', { users });
      } catch (error) {
        res.status(500).send(error);
    }
}

const createArticle = async (req ,res ) => {
    const article = new Article({
        name:req.body.name,
        description:req.body.description,
        author: req.body.author,
    })
    article.save()
    .then(() => {
        res.redirect('/articles');
    })
    .catch((error) => {
        console.log(error)
    }); 
}
module.exports = {getAllArticles,addArticle,createArticle}