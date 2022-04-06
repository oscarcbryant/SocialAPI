const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(

    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getter: true,
        }
    }
);

const Thought = model('thought', thoughtSchema);

model.exports = Course