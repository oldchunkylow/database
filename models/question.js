const mongoose = require(`mongoose`);
const questionSchema = new mongoose.Schema({
    sessionName: {
        type: String
    },
    questionSet: [{
        question: {
            type: String
        },
        answer: [{
            answer: {
                type: String
            },
            correct: {
                type: Boolean
            }
    }]
    }]
}, {
    timestamp: true
})

const Question = mongoose.model(`Question`, questionSchema);
module.exports = Question;
