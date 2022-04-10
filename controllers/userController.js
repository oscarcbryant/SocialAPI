const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
// get all users
    getUsers(req, res) {
        User.find()
        .then(async (user) => {
          res.json({
            user
          })
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
      // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // create a new User
    createUser(req, res) {
      console.log(req.body)
       User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => { console.log(err); res.status(500).json(err) });
      },

    // Update a course
      updateUser(req, res) {
        console.log(req.body)
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No User with this id!' })
              : res.json(user)
          )
          .catch((err) => { console.log(err); res.status(500).json(err)});
      },

      // Delete a user and remove their thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such User exists' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
  //     .then((Thought) =>
  //       ! Thought
  //         ? res.status(404).json({
  //             message: 'User deleted, but no thought found',
  //           })
  //         : res.json({ message: 'User successfully deleted' })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  },

  // Add an friend to a User
  addFriend(req, res) {
    console.log('You are adding an friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
    // Remove frined from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friend: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

}
