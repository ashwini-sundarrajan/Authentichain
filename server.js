const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./book"); // Import the model from book.js

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/authentichain")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 1. GET ALL DRAFTS (Required for draft.html)
app.get("/drafts", async (req, res) => {
    try {
        const drafts = await Book.find({ status: "draft" }).sort({ updatedAt: -1 });
        res.json(drafts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET SINGLE BOOK (Required for editing a draft)
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (err) {
        res.status(404).json({ message: "Book not found" });
    }
});

// 3. SAVE OR UPDATE BOOK
app.post("/save-book", async (req, res) => {
    try {
        const { id, ...bookData } = req.body;
        
        if (id) {
            // Update existing
            const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
            return res.json({ message: "Updated Successfully", book: updatedBook });
        } else {
            // Create new
            const newBook = new Book(bookData);
            await newBook.save();
            return res.json({ message: "Saved Successfully", book: newBook });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));