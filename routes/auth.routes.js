// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();

//Bcrypt library
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

// GET route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

const User = require('../models/User.model');

// POST route ==> to process form data
router.post('/signup', (req, res, next) => {
    console.log('The form data: ', req.body);

    const { username, email, password } = req.body;
 
    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        console.log(`Password hash: ${hashedPassword}`);
        return User.create({
            // username: username
            username,
            email,
            // passwordHash => this is the key from the User model
            //     ^
            //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
            passwordHash: hashedPassword
          });
      })
      .then(userFromDB => {
        console.log('Newly created user is: ', userFromDB);
      })
      .catch(error => next(error));
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));

module.exports = router;
