const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    settings: {
        video: { type: Boolean, default: true },
        audio: { type: Boolean, default: true },
        whiteboard: { type: Boolean, default: true }
    }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;