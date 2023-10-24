const { User, Thought } = require("../models");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: new ObjectId(req.params.usersId) }).select(
        "-__v"
      );
      if (!user) {
        return res.status(404).json({ message: "No user at that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: new ObjectId(req.params.usersId) });

      if (!user) {
        return res.status(404).json({ message: "No user at that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "user and thoughts deleted" });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: new ObjectId(req.params.usersId)},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }
      res.json(user);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },
};
