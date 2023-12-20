const mongoose = require('mongoose');
// Import the reaction schema
const reactionSchema = require('./Reaction');
const { Schema, model } = mongoose;

// Define the schema for thoughts
const thoughtSchema = new Schema(
    {
        // The text content of the thought
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // The timestamp when the thought was created
        createdAt: {
            type: Date,
            default: Date.now,
            // Format the timestamp when sending the JSON response
            get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
        },
        // The username of the user who created the thought
        username: {
            type: String,
            required: true,
        },
        // Array of reactions associated with the thought, using the reaction schema
        reactions: [reactionSchema],
    },
    {
        // Configure toJSON to include virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // Disable inclusion of virtual 'id' in JSON output
        id: false,
    }
);

// Virtual property to get the reaction count for a thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create a model based on the thought schema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model
module.exports = Thought;
