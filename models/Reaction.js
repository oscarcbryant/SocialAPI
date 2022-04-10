const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionID: {
                type: Schema.Types.ObjectId,
                default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        thoughtText: {
                type: String, 
                required: true,
            },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);




const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;