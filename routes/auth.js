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
    const { username, password } = req.body;

    if(!username || !password ){
      res.render('auth/login', {errorMessage: 'Please enter username and password'});
      return;
    }
    
    try {
        const checkIfUserIsUnique = await User.findOne({ 'username': username });

        if(!checkIfUserIsUnique){
            const { username, password } = req.body;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            await User.create({ username, password: hash });
            res.redirect('/'); 
        } else {
            res.render('auth/sign-up', { errorMessage: 'The username already exists' });
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/login', async (req, res) => {
    try {
      res.render('auth/login')
    } catch (error) {
      console.log(error)
    }
})

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    if(!username || !password ){
      res.render('auth/login', {errorMessage: 'Please enter username and password'});
      return;
    }

  try {
    const foundUser = await User.findOne({'username': username});
      
    if (!foundUser) {
      res.render('auth/login', {errorMessage: 'Invalid Login'});
      return;
    }
    
    if(bcrypt.compareSync(password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.redirect('/');
    } else {
      res.render('auth/login'), {errorMessage: 'Invalid login'}
    }

  } catch (error) {
    console.log(error)
  }
})

module.exports = router;