const { Schema, model, Types } = require('mongoose');

// Define the schema for reactions
const reactionSchema = new Schema(
    {
        // Unique identifier for each reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        // The body of the reaction (content)
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // The username of the user who created the reaction
        username: {
            type: String,
            required: true,
        },
        // The timestamp when the reaction was created
        createdAt: {
            type: Date,
            default: Date.now,
            // Format the timestamp when sending the JSON response
            get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
        },
    },
    {
        // Configure toJSON to include getters
        toJSON: {
            getters: true,
        },
        // Disable inclusion of virtual 'id' in JSON output
        id: false,
    }
);

// Export the reaction schema
module.exports = reactionSchema;


