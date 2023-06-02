const express=require('express')
const { getAllPostsController, createPostController, updatePostController, getPostByIdController, deletePostController, userPostController } = require('../controllers/postControllers')

//router object
const router=express.Router()

//routes
//get|| all posts
router.get('/all-post',getAllPostsController)

//post|| create post
router.post('/create-post',createPostController)

//Put || update post
router.put('/update-post/:id', updatePostController)

//get || single post detail
router.get('/get-post/:id',getPostByIdController)

//Delete || delete post
router.delete('/delete-post/:id', deletePostController)

//get|| user post
router.get('/user-post/:id', userPostController)

module.exports=router
