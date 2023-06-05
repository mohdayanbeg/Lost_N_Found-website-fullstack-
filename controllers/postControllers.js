const mongoose = require("mongoose");
const lfModel = require("../models/lfModel");
const userModel = require("../models/userModel");

//Get all posts
exports.getAllPostsController = async (req, res) => {
  try {
    const posts = await lfModel.find({}).populate("user");
    if (!posts) {
      return res.status(200).send({
        success: false,
        message: "No post found",
      });
    }
    return res.status(200).send({
      success: true,
      PostCount: posts.length,
      message: "ALl Posts lists",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Post",
      error,
    });
  }
};

//create post
exports.createPostController = async (req, res) => {
  try {
    const { title, description, image, question, answer, type, user } =
      req.body;
    //validatiion
    if (
      !title ||
      !description ||
      !image ||
      !question ||
      !answer ||
      !type ||
      !user
    ) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newPost = new lfModel({
      title,
      description,
      image,
      question,
      answer,
      type,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    existingUser.posts.push(newPost);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newPost.save();
    return res.status(201).send({
      success: true,
      message: "Post Created",
      newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Post",
      error,
    });
  }
};

//update post
exports.updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, question, answer, type } = req.body;
    const post = await lfModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Post Updated!",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Post",
      error,
    });
  }
};

//single post
exports.getPostByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await lfModel.findById(id).populate("user");
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this ",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single post",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Getting Single Post",
      error,
    });
  }
};

//Delete post
exports.deletePostController = async (req, res) => {
  try {
    console.log(req.params);
    const post = await lfModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await post.user.posts.pull(post);
    await post.user.save();
    return res.status(200).send({
      success: true,
      message: "Post Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting Post",
      error,
    });
  }
};

//Get use post
exports.userPostController = async (req, res) => {
  try {
    const userPost = await userModel.findById(req.params.id).populate("posts");
    if (!userPost) {
      return res.status(404).send({
        success: false,
        message: "post not found with this id",
      });
    }
    console.log(userPost);
    return res.status(200).send({
      success: true,
      message: "user post",
      userPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user Post",
      error,
    });
  }
};
