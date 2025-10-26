const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

// ✅ Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Create new user with image
exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const image = req.file ? req.file.filename : null;

        const newUser = new User({ name, email, age, image });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Update user with new image
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // If a new image is uploaded, delete the old one
        if (req.file) {
            if (user.image) {
                const oldPath = path.join(__dirname, '../uploads/', user.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            user.image = req.file.filename;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.age = age || user.age;

        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ Delete user and image
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.image) {
            const imagePath = path.join(__dirname, '../uploads/', user.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
