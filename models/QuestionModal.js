// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const QuestionSchema = new Schema({
//     quizName: String,
//     quizId: String,      
//     question: String,  
    
// }, { timestamps: true });

// module.exports = mongoose.model('Questation', QuestionSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    id: String,
    value: String,
    status: Boolean
});

const QuestionsSchema = new Schema({
    question: String,
    options: [OptionSchema] // Renamed 'option' to 'options' for better readability
});

const QuestionSchema = new Schema({
    quizName: String,
    quizId: String,
    questions: [QuestionsSchema],
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);
