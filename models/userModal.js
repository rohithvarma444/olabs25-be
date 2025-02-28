const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalScore: { type: Number, default: 0 }, // Leaderboard ranking
    coins: { type: Number, default: 0 },
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    rank: { type: Number, default: 0 } // Precomputed rank
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;