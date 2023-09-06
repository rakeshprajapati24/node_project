const express = require('express');
const router = express.Router();
const {getAllUsers,addUser,createUser,editUser,updateUser,removeUser,showUser,downloadexcel} = require("../controller/userController")



router.route("/").get(getAllUsers);
router.route("/new").get(addUser);
router.route("/insert").post(createUser);
router.route("/edit/:id").get(editUser);
router.route("/update/:id").post(updateUser);
router.route("/delete/:id").get(removeUser);
router.route("/show/:id").get(showUser);
router.route("/download").get(downloadexcel);








module.exports = router;