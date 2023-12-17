const { Reaction, Thought, User } = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No Thought Found with that Id.' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOne({ username: req.body.username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.thoughts.push(thought._id);
            await user.save();

            res.json(thought);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // Update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $set: req.body },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that Id' });
            }

            res.json({ message: 'Thought deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // Create a reacttion
    async createReaction(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            res.json(thoughtData);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // Delete reaction by id
    async deleteReaction(req, res) {
        try {
            await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } }
            );

            res.json({ message: `Reaction removed successfully` });
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
};
