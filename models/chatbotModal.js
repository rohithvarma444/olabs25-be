const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{
        role: { type: String, enum: ['user', 'bot'], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    context: { type: String },  
    keywords: [{ type: String }] 
}, { timestamps: true });

const Chatbot = mongoose.model('Chatbot', chatbotSchema);
module.exports = Chatbot;