var express =   require("express");
var multer  =   require('multer');
var app         =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now()+'.csv');
  }
});



var upload = multer({ storage : storage}).single('userPhoto');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});




var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var clientId = "fahad_hussain@live.com"; // No need to change until you subscribe to the Forever Green plan
var clientSecret = "25b0c462c50746878fb62b16e7d0d78d";  // No need to change until you subscribe to the Forever Green plan

var jsonPayload = JSON.stringify({
    number: "97433442482",  //  Specify the recipient's number here. NOT the gateway number
    message: "*123456* \nSecond device deactivated as investigators look into all possible causes after explosion hits metro in Russian city.\n http://www.aljazeera.com/news/2017/04/blast-hits-st-petersburg-metro-carriage-170403120753707.html"
});

var options = {
    hostname: "api.whatsmate.net",
    port: 80,
    path: "/v1/whatsapp/single/message/2",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": clientId,
        "X-WM-CLIENT-SECRET": clientSecret,
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
};

var request = new http.ClientRequest(options);
request.end(jsonPayload);
//
// request.on('response', function (response) {
//     console.log('Heard back from the WhatsMate WA Gateway:\n');
//     console.log('Status code: ' + response.statusCode);
//     response.setEncoding('utf8');
//     response.on('data', function (chunk) {
//         console.log(chunk);
//     });
// });
