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
/*Show Route*/
router.get(`/:id`, (req, res) => {
    Question.findById(req.params.id, (err, foundItem) => {
        res.render(`route.ejs`, {
            question: foundItem
        });
    })
})

/*Edit Route*/
router.get(`/:id/edit`, (req, res) => {
    Question.findById(req.params.id, (err, foundItem) => {
        res.render(`edit.ejs`, {
            question: foundItem
        });
    })
})
/*Filter Array*/
let filterItem = (arr, query) => {
    return arr.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
}

/*Edit Put*/
router.put(`/:id`, (req, res) => {
    console.log(req.body);

    let questionSet = [];
    let objectKeys = Object.keys(req.body);
    let answersLength = filterItem(objectKeys, "answer").length;
    for (let i = 0; i < answersLength; i++) {
        let question = {
            question: req.body[`question-${i}`],
            answer: []
        }
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
        questionSet.push(question);
    }

    let updatedQuestion = {
        sessionName: req.body.sessionName,
        questionSet: questionSet
    }
    console.log(updatedQuestion);
    Question.findByIdAndUpdate(req.params.id, updatedQuestion, {
        new: true
    }, (err, updatedModel) => {
        res.redirect(`/`);
    })
})

/*Delete*/
router.delete(`/:id`, (req, res) => {
    Question.findByIdAndRemove(req.params.id, (err, foundItem) => {
        res.redirect(`/`);
    })
})
