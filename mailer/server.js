var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mysql = require('mysql');
var os = require('os');

var transporter;
var connection;
var app = express();
var httpServer = http.Server(app);
var smtpConfig = 'data/SMTP_credentials.json';
var mysqlConfig = 'data/mysql_credentials.json';

app.use(bodyParser.urlencoded({
	extended: true
}));

//setting a middleware, which serves static requests automatically
app.use(express.static(__dirname + '/public'));

app.post('/mailSender', function (req, res) {
	var targetMail = req.body.targetMail;
	var subject = req.body.subject;
	var msg = req.body.message;
	var mailOptions = {
		from: 'Project IOT', // sender address
		to: targetMail, // list of receivers
		subject: subject, // Subject line
		text: msg //, // plaintext body
		// html: '<b>Hello world</b>' // You can choose to send an HTML body instead
	};
	
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			res.json({
				message : 'Error: Cannot Send Mail!',
				log : error
			});
		}
		else {
			res.json({
				message : 'Message Sent Successfully!',
				log : info.response
			});
		}
	})
});

app.get('/status', function (req, res) {
	var serverStatusJson = {
		nodeVersion : process.version,
		dependenciesVersions: process.versions,
		serverUptime: process.uptime(),
		serverMemory: process.memoryUsage(),
		os: os.type(),
		platform: os.platform(),
		osArch: os.arch(),
		osUptime: os.uptime(),
		osTotalmem: os.totalmem(),
		osFreemem: os.freemem()
	};
	res.json(serverStatusJson);
});


function serverInit() {
	
	//extracting SMTP credentials from file
	fs.readFile(smtpConfig, 'utf8', function (err, data) {
		if (err) {
			return console.error(err);
		}
		var mailJson = JSON.parse(data);
		transporter = nodemailer.createTransport({
			service: mailJson.service
			, auth: {
				user: mailJson.username
				, pass: mailJson.password
			}
		})
	});
	
	//extracting mysql configuration from file
	fs.readFile(mysqlConfig, 'utf8', function (err, data) {
		if (err) {
			return console.error(err);
		}
		var mysqlJson = JSON.parse(data);
		connection = mysql.createConnection({
			host: mysqlJson.host
			, user: mysqlJson.user
			, password: mysqlJson.password
			, database: mysqlJson.database
		});
		connection.connect(function (err) {
			if (err) {
				console.error('Error Connecting to mysql: ' + err.stack);
			}
			console.log('Successfully Connected to mysql, ID = ' + connection.threadId);
		});
	});
};

var server = app.listen(3000, "127.0.0.1", function () {
	serverInit();
	var host = server.address().address;
	var port = server.address().port;
	console.log("HTTP Server listening at http://%s:%s", host, port);
});