const express = require('express');
const { reset } = require('nodemon');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');


router.get('/signup', async (req, res) => {
    try {
        res.render('auth/sign-up')
    } catch (error) {
        console.log(error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        await User.create({ username, password: hash });
        res.redirect('/user/list')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;