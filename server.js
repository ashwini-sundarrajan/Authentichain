const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const Book = require("./book");       // Your existing model
const User = require("./user"); // New User model

const app = express();

app.use(cors());
app.use(express.json());

// ================== DATABASE ==================
mongoose.connect("mongodb://127.0.0.1:27017/authentichain")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================== AUTH ROUTES ==================

// SIGNUP
app.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check if user exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({
            msg: "Signup successful"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Server error"
        });
    }

});


// LOGIN
app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }

        res.json({
            msg: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Server error"
        });
    }

});



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