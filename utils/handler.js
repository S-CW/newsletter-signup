
exports.handleSubscribingUser = (res, subscribingUser) =>
{
    res.sendFile(__dirname + '/success.html');
    res.sendFile(__dirname + '/success.html');

    res.sendFile(__dirname + '/success.html');

    log.Info(
        `Successfully added contact as audience member. The contact's email address is ${subscribingUser.email}.`
    );

    send.signupMail(req);
}

exports.handleError = (res, error) =>
{
    log.Error(error.response.text);
    res.status(error.status).sendFile(__dirname + '/failure.html');
}