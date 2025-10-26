const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        age: {
            type: Number,
            default: 18,
        },
        image: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
