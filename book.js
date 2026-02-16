const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    author: String,

    contributors: [
        {
            role: String,
            name: String
        }
    ],

    description: String,
    rights: String,

    status: {
        type: String,
        default: "draft"
    },

    manuscript: String

}, { timestamps: true }); // 👈 Important for drafts sorting

module.exports = mongoose.model("Book", BookSchema);
