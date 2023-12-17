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
            const user = await User.findById(req.params.userId).select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that userId' });
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


    // Update a user
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
    }
};

