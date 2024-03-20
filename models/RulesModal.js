const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RulesSchema = new Schema({
    quizid:String,
    quiz: String ,
    rules: String 
}, { timestamps: true });

module.exports = mongoose.model('rules', RulesSchema);
