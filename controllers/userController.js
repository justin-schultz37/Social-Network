const { User } = require('../models');

// Function to handle error responses
const handleErrorResponse = (res, err) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Module exports an object with various controller methods
module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Get a single user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that userId' });
            }

            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Delete a user by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'No user with that userId' });
            }

            // Handle related data or relationships if needed

            res.json({ message: 'User deleted!' });
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Update a user by ID
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this userId!' });
            }

            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found.' });
            }

            if (!user.friends.includes(friendId)) {
                user.friends.push(friendId);
                await user.save();

                friend.friends.push(userId);
                await friend.save();

                res.json({ data: user });
            } else {
                res.status(400).json({ message: 'Friend already added.' });
            }
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findById(userId);
            const friend = await User.findById(friendId);

            if (!user || !friend) {
                return res.status(404).json({ message: 'User or friend not found.' });
            }

            if (user.friends.includes(friendId)) {
                user.friends = user.friends.filter(friend => friend.toString() !== friendId);
                await user.save();

                friend.friends = friend.friends.filter(user => user.toString() !== userId);
                await friend.save();

                res.json({ data: user });
            } else {
                res.status(400).json({ message: 'Friend not found in the user\'s friends list.' });
            }
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },
};

