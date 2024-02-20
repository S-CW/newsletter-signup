const path = require('path');
const log = require('node-file-logger');
const send = require('../email.js');

exports.handleSubscribingUser = (req, res, subscribingUser) =>
{
    res.sendFile(path.join(__dirname, '../success.html'));

    log.Info(
        `Successfully added contact as audience member. The contact's email address is ${subscribingUser.email}.`
    );

    send.signupMail(req);
}

exports.handleError = (res, error) =>
{
    log.Error(error.response.text);
    res.status(error.status).sendFile(path.join(__dirname, '../failure.html'));
}