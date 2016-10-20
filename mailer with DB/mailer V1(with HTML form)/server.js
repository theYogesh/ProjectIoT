'use strict';
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var fs = require('fs');
var mysql = require('mysql');
var os = require('os');
var transporter;
var pool;
var app = express();
var httpServer = http.Server(app);
var smtpConfig = 'data/SMTP_credentials.json';
var mysqlConfig = 'data/mysql_credentials.json';
app.use(bodyParser.urlencoded({
    extended: true
}));
//setting a middleware, which serves static requests automatically
app.use(express.static(__dirname + '/public'));
app.post('/mailSender', function(req, res) {
    pool.getConnection(function(error, connection) {
        var chipCode = req.body.chipCode;
        var status = req.body.status;
        var mailList;
        var isEmpty;
        var username;
        var resResult = {};
        console.log("chipCode: '" + chipCode + "'");
        console.log("status: '" + status + "'");
        if (error) {
            console.error('Error Connecting to mysql:- \nErrorStack: ' + error.stack);
            resResult = {
                status: 'Failure',
                message: 'Cannot make connection with database',
                log: error
            };
            res.json(resResult);
            return;
        } else if (connection.threadId === null) {
            console.log('Error: Cannot Connect to Database, threadId: ' + connection.threadId);
            resResult = {
                status: 'Failure',
                message: 'Cannot make connection with database,threadId=null',
                log: error
            };
            res.json(resResult);
            return;
        } else {
            console.log('Successfully Connected to mysql, ThreadID:  ' + connection.threadId);
            connection.query({
                sql: "SELECT U.username, C.chipCode, E.email" +
                    " FROM projectiot.user AS U" +
                    " JOIN projectiot.chip AS C" +
                    " ON U.userID = C.userID" +
                    " JOIN projectiot.emergencyemail E" +
                    " ON E.userID = U.userID" +
                    " WHERE C.chipCode = ? ",
                timeout: 40000, // 40s
                values: [chipCode]
            }, function(error, results, fields) {
                if (error) {
                    console.error('Error: Cannot execute Query');
                    resResult = {
                        status: 'Failure',
                        message: 'Cannot send mail, Query Error',
                        log: error
                    };
                    res.json(resResult);
                    return;
                } else {
                    isEmpty = false;
                    if (results.length === 0) {
                        isEmpty = true;
                        resResult = {
                            status: 'Failure',
                            message: 'Cannot Send Mail, Mail List is Empty',
                            log: 'null'
                        };
                        res.json(resResult);
                        return;
                    } else {
                        mailList = results[0].email;
                        username = results[0].username;
                        for (var count = 1; count < results.length; count++) {
                            mailList = mailList + ' , ' + results[count].email;
                        }
                        var subject = username.toUpperCase() + ": HOME SECURITY MESSAGE";
                        var msg = "Username: " + username + "\n" + "ChipCode: " + chipCode + "\n" + "Status: " + status;
                        var mailOptions = {
                            from: 'Project IOT', // sender address
                            to: mailList, // list of receivers
                            subject: subject, // Subject line
                            text: msg //, // plaintext body
                                // html: '<b>Hello world</b>' // You can choose to send an HTML body instead
                        };
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.error('Error: Cannot Send Mail!\nError: ');
                                console.log(error);
                                resResult = {
                                    status: 'Failure',
                                    message: 'Cannot Send Mail, Mail Server Error',
                                    log: error
                                };
                                res.json(resResult);
                                return;
                            } else {
                                console.log('Message Sent Successfully!\nResponse: ');
                                console.log(info.response);
                                resResult = {
                                    status: 'success',
                                    message: 'Mail Sent Successfully',
                                    log: info.response
                                };
                                res.json(resResult);
                                return;
                            }
                        });
                    }
                }
            });
            connection.release();
        }
    });
});
app.get('/status', function(req, res) {
    var serverStatusJson = {
        node: {
            nodeVersion: process.version,
            dependenciesVersions: process.versions
        },
        database: {
            vendor: 'MySQL'
        },
        os: {
            type: os.type(),
            platform: os.platform(),
            arch: os.arch(),
            upTime: os.uptime(),
            totalmem: os.totalmem(),
            freemem: os.freemem()
        },
        server: {
            uptime: process.uptime(),
            memory: process.memoryUsage()
        }
    };
    res.json(serverStatusJson);
});

function serverInit() {
    //extracting SMTP credentials from file
    fs.readFile(smtpConfig, 'utf8', function(err, data) {
        if (err) {
            return console.error(err);
        }
        var mailJson = JSON.parse(data);
        transporter = nodemailer.createTransport({
            service: mailJson.service,
            auth: {
                user: mailJson.username,
                pass: mailJson.password
            }
        });
    });
    //extracting mysql configuration from file
    fs.readFile(mysqlConfig, 'utf8', function(err, data) {
        if (err) {
            return console.error(err);
        }
        var mysqlJson = JSON.parse(data);
        pool = mysql.createPool({
            connectionLimit: mysqlJson.connectionLimit,
            host: mysqlJson.host,
            port: mysqlJson.port,
            user: mysqlJson.user,
            password: mysqlJson.password,
            database: mysqlJson.database
        });
    });
}
var server = app.listen(3000, function() {
    serverInit();
    var host = getIPAddress();
    var port = server.address().port;
    console.log("HTTP Server listening at http://%s:%s", host, port);
});

function getIPAddress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '0.0.0.0';
}