const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    quizname: String,
    quizid: String,
    userid: String,
    correctscore: String,
    incorrectscore: String,
    missing: String ,
    totalscore: String,
    status : String
      
}, { timestamps: true });

module.exports = mongoose.model('result', ResultSchema);
