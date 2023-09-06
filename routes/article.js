const express = require("express");
const router = express.Router();

const  {getAllArticles , addArticle , createArticle} = require("../controller/articleController")



router.route("/articles").get(getAllArticles);
router.route("/article/new").get(addArticle);
router.route("/article/create").post(createArticle);
// router.route("/article/edit/:id").get(editArticle);
// router.route("/article/update/:id").post(updateArticle);
// router.route("/article/delete/:id").get(deleteArticle);

module.exports = router;