//___________________
//Dependencies
//___________________
const express = require('express');
const router = express.Router();
const session = require('express-session');
module.exports = router;
//___________________
//Models
//___________________
const Users = require(`../models/users.js`);
const Question = require(`../models/question.js`);

/*Render Page*/

router.get(`/`, (req, res) => {
    Users.find({}, (err, users) => {
        Question.find({}, (err, question) => {
            res.render(`push/push.ejs`, {
                users: users,
                question: question
            });
        })
    })
})
/*Render Upload Session*/
router.get(`/:id/upload`, (req, res) => {
    Users.find({}, (err, users) => {
        Question.findById(req.params.id, (err, foundQuestion) => {
            res.render(`push/update.ejs`, {
                users: users,
                question: foundQuestion
            });
        })
    })
})

/*Put*/
router.put(`/:id`, (req, res) => {
    if (typeof req.body.selectedUsers === "string") {
        req.body.selectedUsers = [req.body.selectedUsers];
        console.log("LENGTH IS " + req.body.selectedUsers.length);
    }
    for (let i = 0; i < req.body.selectedUsers.length; i++) {
        Users.findById(req.body.selectedUsers[i], (error, filterUser) => {
            if (filterUser.activeSessions.includes(req.body.sessionId) === false) {
                Users.findByIdAndUpdate(filterUser.id, {
                    $push: {
                        activeSessions: req.body.sessionId
                    }
                }, {
                    new: true
                }, (err, foundUser) => {
                    console.log("CONSOLELOGGG" + JSON.stringify(foundUser))
                    req.session.currentUser = foundUser;
                    console.log("PUSHED SET HERE" + foundUser);
                    res.redirect("/");

                })
            } else {
                console.log("ALREADY HAVE IT!")
            }
        })
    }
})
