const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: { type: String, require: true },
    device: { type: String, require: true },
    no_if_comments: { type: Number, require: true },
  },
  {
    versionkey: false,
  }
);

const postModel = mongoose.model("post", postsSchema);

module.exports = { postModel };
