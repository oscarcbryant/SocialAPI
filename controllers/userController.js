const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
// get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                userCount: await userCount(),
            };
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
      // Get a single user
  getSingleStudent(req, res) {
    Student.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              grade: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

    // create a new student
    createUser(req, res) {
       User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
      },
}
