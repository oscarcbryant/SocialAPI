const { Reaction, Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    console.log(req.body)
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // Delete a thought
    removeThought (req, res) {
      Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : Thought.deleteMany({ _id: { $in: thought.user } })
        )
        .then(() => res.json({ message: 'Thought and User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },
  

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
// Post a reaction to a Thought

createReaction(req, res) {
  console.log('You are adding an reaction');
  console.log(req.body);
  Reaction.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { reactions: req.params.reactionsId } },
    { runValidators: true, new: true },
    console.log(req.params.userId)
  )
    .then((user) =>
      !user
        ? res
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},


// createReaction(req, res) {
//   Reaction.create(req.body)
//     .then((course) => res.json(course))
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json(err);
//     });
// },

// // Delete a thought
// removeReaction(req, res) {
//   Reaction.findOneAndDelete({ _id: req.params.reactionId })
//     .then((reaction) =>
//       !reaction
//         ? res.status(404).json({ message: 'No course with that ID' })
//         : Reaction.deleteMany({ _id: { $in: reaction.thought.user } })
//     )
//     .then(() => res.json({ message: 'Reaction, Thought and User deleted!' }))
//     .catch((err) => res.status(500).json(err));
// },


};