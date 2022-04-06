const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  }
};