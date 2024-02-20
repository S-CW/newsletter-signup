const express = require('express');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require('https');
const { execPath } = require('process');
const log = require('node-file-logger');
const dotenv = require('dotenv')
const send = require('./email.js');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) =>
{
  res.sendFile(__dirname + '/signup.html');
});

app.post('/failure', (req, res) =>
{
  res.redirect('/')
})

app.post('/', async (req, res, next) =>
{
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // creating an object storing the user data
  const listId = process.env.MAILCHIMP_AUDIENCE_ID
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
  
      res.sendFile(__dirname + '/success.html');
  
      log.Info(
        `Successfully added contact as an audience member. The contact's id is ${response.id
        }.`
      );
      send.signupMail(req);
  } catch (error) {
    log.Error(error.response.text);
    res.status(error.status).sendFile(__dirname + '/failure.html');
  }
});


app.listen(process.env.PORT || 3000, function ()
{
  log.Info('Server is running on port:3000')
});

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_MARKETING_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});