'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
    else {
        // Init the express application
        var app = require('./config/express')(db);

        // Bootstrap passport config
        require('./config/passport')();

        // Start the app by listening on <port>
        app.listen(config.port);

        // Expose app
        exports = module.exports = app;

        // Ideally, the timeout check stuff would be in a separate process, but then I'm not sure Heroku would be
        // quite as free any more...
        var cron = require('cron');
        var timeoutCheck = require('./utilities/timeoutcheck');
        try {
            var timeoutCheckJob = new cron.CronJob('*/1 * * * *', timeoutCheck.check);
            timeoutCheckJob.start();
        } catch(e) {
            console.log('exception setting up cron job: ' + e);
        }

        // Logging initialization
        console.log('MEAN.JS application started on port ' + config.port);

    }
});
