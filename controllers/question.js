//___________________
//Dependencies
//___________________
const express = require('express');
const router = express.Router();
module.exports = router;
//___________________
//Models
//___________________
const Question = require(`../models/question.js`);

//___________________
//Routes
//___________________
router.get(`/new`, (req, res) => {
    res.render(`question/new.ejs`);
})
/*Filter Array*/
let filterItem = (arr, query) => {
    return arr.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
}
/*Create*/
router.post(`/`, (req, res) => {
    let questionSet = [];
    let objectKeys = Object.keys(req.body);
    let answersLength = filterItem(objectKeys, "answer").length;

    for (let i = 0; i < answersLength; i++) {
        let question = {
            question: req.body[`question-${i}`],
            answer: []
        }
        if (typeof req.body[`answer-${i}`] === "string") {
            let option = {
                answer: req.body[`answer-${i}`],
                correct: req.body[`checked-${i}`]
            }
            question.answer.push(option);
        } else {
            for (let j = 0; j < req.body[`answer-${i}`].length; j++) {
                if (req.body[`checked-${i}`][j] === "false") {
                    req.body[`checked-${i}`][j] = false;
                } else {
                    req.body[`checked-${i}`][j] = true;
                }
                let option = {
                    answer: req.body[`answer-${i}`][j],
                    correct: req.body[`checked-${i}`][j]
                }
                question.answer.push(option);
            }
        }

        questionSet.push(question);
    }

    Question.create({
        sessionName: req.body.sessionName,
        questionSet: questionSet
    }, (err, createdSet) => {
        console.log("CREATED SET HERE" + createdSet);
        res.redirect(`/`);
    })
})
