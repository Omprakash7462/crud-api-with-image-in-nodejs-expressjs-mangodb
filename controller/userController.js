const User = require('../models/userModel.js');

// @desc    Get all users
// @route   GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create new user
// @route   POST /api/users
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // user ID from URL
        const { name, email, age } = req.body; // fields to update

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, age },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // user ID from URL

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};