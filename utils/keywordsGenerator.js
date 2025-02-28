const natural = require('natural');

const extractKeywords = async (subsection) => {
    const tokenizer = new natural.WordTokenizer();

    const content = `${subsection.commonTitle} ${subsection.commonProcedureTitle} 
                     ${subsection.content} ${subsection.exampleUsage || ''} 
                     ${subsection.procedure?.map(p => p.title + ' ' + p.description).join(' ')}`;

    const words = tokenizer.tokenize(content);
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(words.join(' '));

    let extractedKeywords = [];
    tfidf.listTerms(0).forEach(term => {
        if (term.tfidf > 1) extractedKeywords.push(term.term);
    });

    return extractedKeywords.slice(0, 10);
};

module.exports = { extractKeywords };