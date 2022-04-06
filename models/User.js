const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            max_length: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 30
        },
        thoughts: [thoughtSchema],
        friends: [User]
    },
    {
        toJSON: {
            getters: false,
        },
    }
);

const User = model('user', userSchema);

model.exports = User;