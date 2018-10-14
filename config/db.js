if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://NoerGitKat:Blabla_55@ds131983.mlab.com:31983/vidjot-production-db',
	};
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/vidjot-dev',
	};
}
