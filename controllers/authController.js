const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req);
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(400).json({ message: "User already exists." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

const getUserProfile = async (req, res) => {
    res.json(req.user);
};

module.exports = { registerUser, loginUser, getUserProfile };