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
        reactions: [{ type: Schema.Types.ObjectId,
                        ref: 'Thoughts'}],
    },
    {
        toJSON: {
            getter: false,
            virtuals: true
        },
        id: true,
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
});



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;