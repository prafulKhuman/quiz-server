const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    name: String,
    category: String,      
    description: String,  
    totalQuestion: Number  
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
