const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    subsections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubSection' }]
}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;