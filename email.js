const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const dotenv = require('dotenv');
dotenv.config();


exports.signupMail = (req) =>
{
    fs.readFile('emails/signup_greeting.ejs', 'utf8', (err, template) =>
    {
        if (err) {
            console.error('Error reading HTML file:', err);
            return;
        }

        let compiledTemplate = ejs.compile(template);

        let templateVars = {
            username: req.body.fName + " " + req.body.lName
        };

        let html = compiledTemplate(templateVars)

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
        });


        mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: req.body.email,
            subject: "Thank You for Joining Us!",
            html: html,
            attachments: [{
                filename: 'betta_logo.png',
                path: 'public/img/betta_logo.png',
                cid: 'betta_logo'
            }],
        }

        transporter.sendMail(mailOptions, (err, info) =>
        {
            if (err) {
                console.log(err);
            } else {
                console.log(info)
            }
        });

    })
}
