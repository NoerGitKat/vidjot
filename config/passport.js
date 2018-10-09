const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const User = mongoose.model('users');

module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
			},
			(email, password, done) => {
				User.findOne({
					email: email,
				})
					.then(user => {
						if (!user) {
							return done(null, false, { message: "Account doesn't exist!" });
						}

						bcrypt
							.compare(password, user.password, (error, isMatch) => {
								if (error) throw error;
								if (isMatch) {
									return done(null, user);
								} else {
									return done(null, false, { message: 'Password incorrect' });
								}
							})
							.then(res => {
								res.redirect('/ideas');
							})
							.catch(error => console.log('error', error));
					})
					.catch(error => console.log(error));
			}
		)
	);

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(error, user) {
			done(error, user);
		});
	});
};
