const express = require("express");

const postRouter = express.Router();

const jwt = require("jsonwebtoken");

const { postModel } = require("../model/Posts.model");

postRouter.get("/", async (req, res) => {
  const { user } = req.body;
  const device = req.query.device;
  const { device1, device2 } = req.query;
  if (device1 && device2) {
    try {
      let posts = await postModel.find({
        user,
        $or: [
          { device: { $regex: `${device1}`, $options: "i" } },
          { device: { $regex: `${device2}`, $options: "i" } },
        ],
      });
      res.status(200).send(posts);
    } catch (err) {
      res.send(401).send({ msg: err.message });
    }
  } else if (device) {
    try {
      let posts = await postModel.find({
        user,
        device: { $regex: `${device}`, $options: "i" },
      });
      res.status(200).send(posts);
    } catch (error) {
      res.status(401).send({ msg: error.message });
    }
  } else {
    let posts = await postModel.find({ user });
    res.status(200).send(posts);
  }
});

postRouter.post("/top", async (req, res) => {
  const payload = req.body;
  const post = new postModel(payload);
  await post.save();
  res.send({ msg: "Post created" });
});

postRouter.patch("/update:id", async (req, res) => {
  const postID = req.params.id;
  const payload = req.body;
  try {
    await postModel.findByIdAndUpdate({ _id: postID }, payload);
    res.send({ msg: `Post with id:${postID} has been updated` });
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});

postRouter.delete("/delete:id", async (req, res) => {
  const postID = req.params.id;
  const post = await postModel().findOne({ _id: postID });
  try {
    await postModel.findByIdAndDelete({ _id: postID });
    res.send({ msg: `Post with id:${postID} has been deleted` });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  postRouter
};
