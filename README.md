# News Letter Signup Application
### About
A news letter signup application that makes use of Mailchimp Marketing API to subscribe user to your product daily email services. Upon signup, user will receive a confirmation email of subscription

Mailchimp is a marketing automation and email marketing platform that helps businesses to reach their customer with ease and manages automated email

Live site URL: [newsletter signup](https://betta-empire.monsterwebdev.com)

### Installation
1. Clone the repository or donwload repository zip
2. Run ```npm install``` to install required dependency
3. Create .env file and fill in the config for smtp config and mailchimp api
    ```
    cp .env.testing .env
    ```

    Mailchimp API key can be obtain here [How To Get Mailchimp API KEY](https://mailchimp.com/help/about-api-keys/)
4. Run ```node app.js``` on terminal to run the application.
5. By default, the application will run on http://localhost:3000 unless PORT is set by .env

### Build with
express.js, ejs, nodemailer, node-file-logger, mailchimp api

### Extras
Added logging script for nodejs application cPanel deployment