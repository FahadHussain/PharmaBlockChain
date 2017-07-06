var node = require('./bc.js');
var config = require('./config.js');
var fb = require('./fb_Jobs.js');
var cron = require('node-cron');

var express = require('express');
var app = express();
var bodyParser = require("body-parser");

var response = {};

//Express Configurations
app.disable('etag');
app.use(express.static('public'))


// 30 Seconds
var schedulerTime = "10";

var task1 = cron.schedule('1-59/'+schedulerTime+' * * * * *', function()
{
  fb.SyncManufacturerERP();
  console.log('Schedule Job Sync Manufacturer ERP');
},
false);


var task2 = cron.schedule('1-59/'+schedulerTime+' * * * * *', function()
{
  fb.SyncDistributorERP();
  console.log('Schedule Job Sync Distributor ERP');
},
false);


var task3 = cron.schedule('1-59/'+schedulerTime+' * * * * *', function()
{
  fb.SyncRetailerERP();
  console.log('Schedule Job Sync Retailer ERP');
},
false);


var task4 = cron.schedule('1-59/45 * * * * *', function()
{
  //fb.LoadMasterData();
  console.log('Schedule Job Load Master Data');
},
false);

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Home Page
app.get('/', function(req, res)
{
  res.status(200);

  res.set('Content-Type', 'application/json');
  response.data = "Weclome to Block Chain APIs";
  res.send(JSON.stringify(response));

});

// API Functions
// Meta Function
app.get('/api/meta/:itemID', function(req, res)
{
  res.status(200);

  res.set('Content-Type', 'application/json');
  response.data = node.meta(req.params.itemID);
  res.send(JSON.stringify(response));
});

// API Functions
// Complete Meta Function
app.get('/api/completemeta/', function(req, res)
{
  res.status(200);

  var promise = fb.GetCompleteMetaData();
  promise.then(function(data)
  {
    res.send(JSON.stringify(data));
  });

  promise.catch(function(error)
  {
    response.data = error;
    res.send(JSON.stringify(response));
  });

});



// API Functions
// Job Function
app.get('/api/jobs/start', function(req, res)
{
  res.status(200);

  task1.start();
  task2.start();
  task3.start();
  task4.start();

  res.set('Content-Type', 'application/json');
  response.data = "Tasks Started Successfully!"
  res.send(JSON.stringify(response));
});


// API Functions
// Job Function
app.get('/api/jobs/stop', function(req, res)
{
  res.status(200);

  task1.stop();
  task2.stop();
  task3.stop();
  task4.stop();

  res.set('Content-Type', 'application/json');
  response.data = "Tasks Stopped Successfully!"
  res.send(JSON.stringify(response));
});


// Mobile API
// Status Function
app.get('/api/execute/', function(req, res)
{
  res.status(200);
  res.set('Content-Type', 'application/json');
  if (req.query.data != undefined)
  {
  response = node.scanningDP4(req.query.data);
  }
  else
  {
    response = node.scanningDP4("");
  }

  res.send(JSON.stringify([response]));
});

// 404 - Page Not Found
app.use(function(req, res)
{
     res.status(404);

     res.set('Content-Type', 'application/json');
     response.data = "404: Page not Found"
     res.send(JSON.stringify(response));
});

// 500 - Internal Server Error
app.use(function(error, req, res, next)
{
  res.status(500);

  res.set('Content-Type', 'application/json');
  response.data = "500: Internal Server Error"
  console.log(error);
  res.send(JSON.stringify(response));
});

app.listen(config.web.hostport);
