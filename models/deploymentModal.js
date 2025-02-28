const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    code: { type: String, required: true },
    status: { type: String, enum: ['pending', 'deployed', 'failed'], default: 'pending' },
    deployedAt: { type: Date }
}, { timestamps: true });

const Deployment = mongoose.model('Deployment', deploymentSchema);
module.exports = Deployment;