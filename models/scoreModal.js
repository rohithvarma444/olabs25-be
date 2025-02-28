const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    coinsEarned: { type: Number, default: 0 }
}, { timestamps: true });

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;