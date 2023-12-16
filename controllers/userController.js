const { User } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
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
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ username: req.params.username });

            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }

            // Handle related data or relationships if needed

            res.json({ message: 'User deleted!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

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
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

