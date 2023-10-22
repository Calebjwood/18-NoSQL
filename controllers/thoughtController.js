const { User, Thought } = require("../models");

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
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      const user = await User.findByIdAndUpdate(
        { thought: req.params.thoughtId },
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
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(res, req) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought at this ID!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
