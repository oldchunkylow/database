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
const Users = require(`../models/users.js`);

/*Render Create User Page*/
router.get(`/`, (req, res) => {
    res.render(`users/createusers.ejs`);
})

/*
Create User*/
router.post(`/`, (req, res) => {
    console.log(req.body);
    Users.create(req.body, (err, newUser) => {
        console.log(newUser);
        res.redirect(`/`);
    })
})
