require('dotenv').config();
const fetch = require('node-fetch');
const nodemailer = require("nodemailer");


(async function run(){
console.log("running forecast");

const locationRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/US/search?q=${encodeURIComponent('Philadelphia')}&apikey=${process.env.ACCUWEATHER_API_KEY}`);
const locationData = await locationRequest.json();
const locationKey = locationData[0].Key;

const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${process.env.ACCUWEATHER_API_KEY}`);
const forecastData = await forecastRequest.json();

const temperature = forecastData.DailyForecasts[0].Temperature;




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
	<h2>Weather</h2>
	<p>Forecast: ${forecastData.Headline.Text}</p>
	<p>Min: ${temperature.Minimum.Value}° ${temperature.Minimum.Unit} </p>
	<p>Max: ${temperature.Maximum.Value}° ${temperature.Maximum.Unit} </p>
	
	`, // html body
      });
}) ();