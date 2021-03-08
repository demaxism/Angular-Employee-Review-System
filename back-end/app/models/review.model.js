const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    from_user: String,
    to_user: String,
    content: String
  })
);

module.exports = Review;