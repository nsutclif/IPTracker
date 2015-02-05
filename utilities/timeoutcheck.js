'use strict';
/**
 * Module dependencies.
 */
var config = require('./../config/config'),
    mongoose = require('mongoose'),
    Ipthost = mongoose.model('Ipthost'),
    nodemailer = require('nodemailer');

module.exports.check = function() {
    console.log('timeoutCheck');

    var timeoutTime = new Date();

    // Find all the hosts that have timed out and we haven't sent emails for:

    Ipthost
        .find( {alertTimeoutSent: {$ne: true}, alertTimeout: {$lt: timeoutTime}} )
        .populate('user', 'email firstName lastName') // look up the user info for this host
        .exec(function(err,ipthosts) {
            ipthosts.forEach( function(ipthost) {
                console.log('Timed Out: ' + JSON.stringify(ipthost));

                // send an email
                var transporter = nodemailer.createTransport(config.mailer.options);

                var ipChangeEmail = {
                    from: config.mailer.from,
                    to: ipthost.user.email,
                    subject: ipthost.name + ' has timed out',
                    text: 'Last Known IP Address: ' + ipthost.lastEventIP + '\n' +
                          'Last Contact Time: ' + ipthost.lastEventTime
                };

                transporter.sendMail(ipChangeEmail, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);

                        ipthost.alertTimeoutSent = true;

                        ipthost.save(function(err) {
                            if (err) {
                                // TODO: What to do in this situation?  This is an async callback.
                                console.log(err);
                            };
                        });
                    }
                });
            });
        });

    // Find all the hosts that aren't timed out any more but we have sent emails for:

    Ipthost
        .find( {alertTimeoutSent: true, alertTimeout: {$gt: timeoutTime}} )
        .populate('user', 'email firstName lastName') // look up the user info for this host
        .exec(function(err,ipthosts) {
            ipthosts.forEach( function(ipthost) {
                console.log('No Longer Timed Out:' + JSON.stringify(ipthost));

                // send an email
                var transporter = nodemailer.createTransport(config.mailer.options);

                var ipChangeEmail = {
                    from: config.mailer.from,
                    to: ipthost.user.email,
                    subject: ipthost.name + ' back online!',
                    text: 'IP Address: ' + ipthost.lastEventIP + '\n' +
                    'Last Contact Time: ' + ipthost.lastEventTime
                };

                transporter.sendMail(ipChangeEmail, function(error, info){
                    if(error){
                        console.log(error);
                    }else{
                        console.log('Message sent: ' + info.response);

                        ipthost.alertTimeoutSent = false;

                        ipthost.save(function(err) {
                            if (err) {
                                // TODO: What to do in this situation?  This is an async callback.
                                console.log(err);
                            };
                        });
                    }
                });
            });
        });
};
