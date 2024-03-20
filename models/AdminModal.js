const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String,      
}, { timestamps: true });

module.exports = mongoose.model('admin', AdminSchema);
