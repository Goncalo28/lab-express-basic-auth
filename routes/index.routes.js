const express = require('express');
const router = express.Router();
const User = require('../models/User.model')

function requireLogin (req, res, next) {
    if(req.session.currentUser){
      next();
    } else {
      res.redirect('/login');
    };
};

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index', {user: req.session.currentUser})
});

router.get('/user/list', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/list', {users: allUsers})
    } catch (error) {
        res.render('error')
    }
});

router.get('/private', requireLogin, (req, res) => {
    res.render('private')
})

router.get('/main', requireLogin, (req, res) => {
    res.render('main')
})

module.exports = router;
