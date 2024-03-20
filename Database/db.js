const mongoose = require('mongoose');

// const DB ="mongodb+srv://Khuman:asd123@cluster0.0twf9mf.mongodb.net/quiz?retryWrites=true&w=majority";
// const DB = "mongodb+srv://prafulkhuman:praful123@cluster0.a2aqfoc.mongodb.net/quiz?retryWrites=true&w=majority"
const DB = "mongodb+srv://prafulkhuman:praful123@cluster0.a2aqfoc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, // Add this line to address the warning
}).then(() => {
    console.log("Database has been connected successfully!");
}).catch(error => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process on database connection error
});