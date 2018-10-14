const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');

// Import DB
const { mongoURI } = require('./config/db');

// Import routes
const ideasRouter = require('./routes/ideas');
const usersRouter = require('./routes/users');

// Passport config
require('./config/passport')(passport);

// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Using static files like styles
app.use(express.static('public'));

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use express-session
app.use(
	session({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: true,
	})
);

// Initialize passport session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash
app.use(flash());

// Set global variables
app.use(function(req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// Connecting DB
mongoose
	.connect(
		mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected...'))
	.catch(error => console.log(error));

const port = process.env.PORT || 5000;

// GET Home route
app.get('/', (req, res) => {
	const title = 'VidJot';
	res.render('index', {
		title: title,
	});
});

// GET About route
app.get('/about', (req, res) => {
	res.render('about');
});

// Routes
app.use('/ideas', ideasRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Port is running on ${port}`);
});
