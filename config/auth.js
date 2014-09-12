// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: process.env.FACEBOOK_OAUTH_CLIENT_ID || '*', // Can't store these in GitHub.
		'clientSecret' 	: process.env.FACEBOOK_OAUTH_CLIENT_SECRET || '*', // Can't store these in GitHub.
		'callbackURL' 	: '/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: process.env.GOOGLE_OAUTH_CLIENT_ID || '*', // Can't store these in GitHub.
		'clientSecret' 	: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '*', // Can't store these in GitHub.
		'callbackURL' 	: '/auth/google/callback'
	}

};