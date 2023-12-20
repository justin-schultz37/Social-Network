// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Connect to the MongoDB database located at 'mongodb://127.0.0.1:27017/socialnetworkDB'
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB');

// Export the mongoose connection to be used in other parts of the application
module.exports = mongoose.connection;
