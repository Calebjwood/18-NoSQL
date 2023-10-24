const { User, Thought } = require("../models");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


module.exports = {
  async getThought(req, res) {
    try {
      const thought = await Thought.find();

      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: new ObjectId(req.params.thoughtId),
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: new ObjectId(req.params.thoughtId),
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      const user = await User.findByIdAndUpdate(
        { thought: new ObjectId(req.params.thoughtId) },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought deleted, but no user found" });
      }

      res.json({ message: "Thought deleted" });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  },

  async updateThought(req, res) {
    try {
      console.log(req.body);
      const thought = await Thought.findByIdAndUpdate(
        { _id: new ObjectId(req.params.thoughtId) },
        { $set: req.body },
        {runValidators: true, new: true }
        
      );
        console.log(thought);
      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      res.json(thought);
    } catch (err) {
     return res.status(500).json(err.message);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new ObjectId(req.params.thoughtId)},
        { $addToSet: { reactions: req.body } },
        {runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: new ObjectId(req.params.thoughtId) },
        { $pull: { reactions: { reactionID: new ObjectId(req.params.reactionId) } } },
        {runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
};
