// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: process.env.GOOGLE_OAUTH_CLIENT_ID, // Can't really store these in GitHub...
		'clientSecret' 	: process.env.GOOGLE_OAUTH_CLIENT_SECRET, // Can't really store these in GitHub...
		'callbackURL' 	: '/auth/google/callback'
	}

};