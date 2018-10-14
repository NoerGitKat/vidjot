const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();

// Import util functions
const validateRegisterForm = require('./../utils/validation/validateRegisterForm');

// Authentication check
const { ensureAuthenticated } = require('./../helpers/auth');

// Load Users Model
const UserModel = require('../models/user');
const User = mongoose.model('users');

// GET User login route
router.get('/login', (req, res) => {
	res.render('users/login');
});

// GET User register route
router.get('/register', (req, res) => {
	res.render('users/register');
});

// POST User login route
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/ideas',
		failureRedirect: '/users/login',
		failureFlash: true,
	})(req, res, next);
});

// GET User logout route
router.get('/logout', ensureAuthenticated, (req, res) => {
	req.logout();
	req.flash('success_msg', 'You succesfully logged out!');
	res.redirect('/users/login');
});

// POST User register route
router.post('/register', (req, res) => {
	console.log('req.body', req.body);
	// Form validation
	const errors = validateRegisterForm(req.body);
	console.log(errors);
	if (errors.length > 0) {
		res.render('users/register', {
			errors: errors,
		});
	} else {
		const salt = bcrypt.genSaltSync(10);
		bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
			const newUser = {
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			};
			new User(newUser)
				.save()
				.then(user => {
					console.log(user);
					req.flash('success_msg', 'You are now registered and can log in!');
					res.redirect('/users/login');
				})
				.catch(error => console.log(error));
		});
	}
});

module.exports = router;
