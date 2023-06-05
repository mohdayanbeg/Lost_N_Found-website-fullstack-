const mongoose = require("mongoose");

const lfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      // required: [true, "image is required"],
    },
    question: {
      type: String,
      // required:[true,'Question is required']
    },
    answer: {
      type: String,
      // required:[true,'Answer is required']
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const lfModel = mongoose.model("lf", lfSchema);

module.exports = lfModel;
