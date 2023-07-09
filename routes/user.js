const express = require('express');
const router = express.Router();
const {getAllUsers,addUser,createUser,editUser,updateUser,deleteUser,uploadfile} = require("../controller/userController")



router.route("/").get(getAllUsers);
router.route("/new").get(addUser);
router.route("/insert").post(createUser);
router.route("/edit/:id").get(editUser);
router.route("/update/:id").post(updateUser);
router.route("/delete/:id").get(deleteUser);
router.route("/upload").post(uploadfile);






module.exports = router;