const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Import util functions
const validateIdeaForm = require('../utils/validation/validateIdeaForm');

// Load Ideas Model
const IdeaModel = require('../models/idea');
const Idea = mongoose.model('ideas');

// Authentication check
const { ensureAuthenticated } = require('./../helpers/auth');

// GET Idea route
router.get('/', ensureAuthenticated, (req, res) => {
	Idea.find({ user: req.user.id })
		.then(ideas => {
			console.log('ideas', ideas);
			res.render('ideas', { ideas });
		})
		.catch(error => console.log(error));
});

// GET Edit idea route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	Idea.findOne({
		_id: req.params.id,
	})
		.then(idea => {
			if (idea.user != req.user.id) {
				req.flash('error_msg', 'Not Authorized');
				res.redirect('/ideas');
			}
			res.render('ideas/edit', { idea });
		})
		.catch(error => console.log(error));
});

// PUT Edit idea route
router.put('/edit/:id', ensureAuthenticated, (req, res) => {
	const { title, details } = req.body;
	Idea.findOne({
		_id: req.params.id,
	})
		.then(idea => {
			// Overwrite entry with edited values
			idea.title = title;
			idea.details = details;

			idea.save().then(() => res.redirect('/ideas'));
		})
		.catch(error => console.log(error));
});

// DELETE Delete idea route
router.delete('/delete/:id', ensureAuthenticated, (req, res) => {
	Idea.deleteOne({
		_id: req.params.id,
	})
		.then(() => {
			req.flash('success_msg', 'Video idea removed successfully!');
			res.redirect('/ideas');
		})
		.catch(error => console.log(error));
});

// GET Add idea route
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('ideas/add');
});

// POST Add idea route
router.post('/add', (req, res) => {
	const { title, details } = req.body;
	// Form validation
	const errors = validateIdeaForm(req.body);

	if (errors.length > 0) {
		res.render('ideas/add', {
			errors: errors,
		});
	} else {
		const newIdea = {
			title,
			details,
			user: req.user.id,
		};
		new Idea(newIdea)
			.save()
			.then(idea => console.log(idea))
			.catch(error => console.log(error));
		res.redirect('/ideas');
	}
});

module.exports = router;
