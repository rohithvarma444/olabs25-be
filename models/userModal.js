const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    coins: { type: Number, default: 0 },
    quizzesTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;