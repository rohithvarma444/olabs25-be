const mongoose = require('mongoose');
const natural = require('natural');

const subSectionSchema = new mongoose.Schema({
    commonTitle: { type: String, required: true },  // Main topic title
    mediaURL: { type: String }, // Optional media (images/videos)

    commonProcedureTitle: { type: String, required: true }, // Procedure title
    procedure: [{
        title: { type: String, required: true },  
        description: { type: String, required: true },  // Step-by-step details
        example: { type: String }  // Code snippet or explanation
    }],

    resources: [{
        title: { type: String }, 
        link: { type: String, required: true }  // External references
    }],

    // 🔥 New Fields for Detailed Content
    content: { type: String, required: true },  // In-depth explanation of the topic
    exampleUsage: { type: String },  // Real-world usage examples

    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    scores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Score' }],

    keywords: [{ type: String }]  // Auto-generated NLP keywords
}, { timestamps: true });

// ✅ Better Keyword Extraction with Full Content
subSectionSchema.pre('save', function (next) {
    const tokenizer = new natural.WordTokenizer();
    
    const content = `${this.commonTitle} ${this.commonProcedureTitle} 
                     ${this.content} ${this.exampleUsage || ''} 
                     ${this.procedure.map(p => p.title + ' ' + p.description).join(' ')}`;

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