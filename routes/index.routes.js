const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/user/list', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/list', {users: allUsers})
    } catch (error) {
        res.render('error')
    }
})

module.exports = router;
