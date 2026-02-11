const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/authentichain")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
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
    status: String   // 👈 NEW (draft / published)
});


// Model
const Book = mongoose.model("Book", BookSchema);

// Save API
app.post("/save-book", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.json({ message: "Saved Successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
