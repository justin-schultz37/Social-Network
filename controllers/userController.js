const { User } = require('../models');

const handleErrorResponse = (res, err) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

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

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username }).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }

            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ username: req.params.username });

            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }

            // Handle related data or relationships if needed

            res.json({ message: 'User deleted!' });
        } catch (err) {
            handleErrorResponse(res, err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { username: req.params.username },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this username!' });
            }

            res.json(user);
        } catch (err) {
            handleErrorResponse(res, err);
        }
    }
};

