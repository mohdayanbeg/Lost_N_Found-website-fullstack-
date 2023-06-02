const express= require('express')
const { getAllUsers, registerController, loginCotroller } = require('../controllers/userController')

//router object
const router = express.Router()

//get all user || get
router.get('/all-users', getAllUsers);

//create user|| post
router.post('/register', registerController);

//login|| post
router.post('/login', loginCotroller);

module.exports=router