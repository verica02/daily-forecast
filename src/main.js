require('dotenv').config();
const nodemailer = require("nodemailer");

(async function run(){
console.log("running forecast");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
	  user: process.env.MAIL_USER_EMAIL, // generated ethereal user
	  pass: process.env.MAIL_USER_PASSWORD // generated ethereal password
	},
      });


        await transporter.sendMail({
	from: process.env.MAIL_FROM, // sender address
	to: process.env.MAIL_TO, // list of receivers
	subject: "Daily Forecast", // Subject line
	text: `
	Daily Forecast
	
	`, // plain text body
	html: `
	
	<h1>Daily Forecast</h1>
	
	`, // html body
      });
}) ();