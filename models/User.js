const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Define the schema for users
const userSchema = new Schema(
    {
        // The username of the user
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        // The email address of the user
        email: {
            type: String,
            required: true,
            unique: true,
            // Validate email format using a regular expression
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        // Array of thought IDs associated with the user
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // Array of user IDs representing the user's friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        // Configure toJSON to include virtuals
        toJSON: {
            virtuals: true,
        },
        // Disable inclusion of virtual 'id' in JSON output
        id: false,
    }
);

// Virtual property to get the friend count for a user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create a model based on the user schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;
