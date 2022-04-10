const { Schema, model } = require('mongoose');

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
       Thought: [{ type: Schema.Types.ObjectId,
                    ref: 'Thought'}],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ],
    },
    {
        toJSON: { 
            getters: false,
            virtuals: true
        },
        id: true
    }
);

userSchema
.virtual('friendCount')
.get(function () {
return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;