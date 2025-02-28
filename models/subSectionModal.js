const mongoose = require('mongoose');
const natural = require('natural');

const subSectionSchema = new mongoose.Schema({
    commonTitle: { type: String, required: true },
    mediaURL: { type: String },
    commonProcedureTitle: { type: String, required: true },
    procedure: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        example: { type: String }
    }],
    resources: [{
        title: { type: String },
        link: { type: String, required: true }
    }],
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],
    keywords: [{ type: String }]
}, { timestamps: true });

subSectionSchema.pre('save', function (next) {
    const tokenizer = new natural.WordTokenizer();
    const content = `${this.commonTitle} ${this.commonProcedureTitle} ${this.procedure.map(p => p.title + ' ' + p.description).join(' ')}`;

    const words = tokenizer.tokenize(content);
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(words.join(' '));

    let extractedKeywords = [];
    tfidf.listTerms(0).forEach(term => {
        if (term.tfidf > 1) extractedKeywords.push(term.term);
    });

    this.keywords = extractedKeywords.slice(0, 10);
    next();
});

const SubSection = mongoose.model('SubSection', subSectionSchema);
module.exports = SubSection;