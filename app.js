const express = require('express');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require('https');
const { execPath } = require('process');
const log = require('node-file-logger');
const dotenv = require('dotenv')
const show = require('./utils/handler.js');

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
    const response = await mailchimp.lists.getListMember(listId, email);

    if (response.status === 'subscribed') {
      res.sendFile(__dirname + '/member.html');
    } else {
      const response = mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });

      show.handleSubscribingUser(res, subscribingUser);
    }
    
  } catch (error) {
    // Add new member to list
    if (error.status === 404) {
      try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
          }
        });

        show.handleSubscribingUser(res, subscribingUser);
      } catch (error) {
        show.handleError(res, error);
      }
    }
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