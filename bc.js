var node = {};

var Web3 = require('web3');
var web3 = new Web3();

var http = require('http');
var config = require('./config.js');

web3.setProvider(new web3.providers.HttpProvider(config.local.hostaddress));

var coffeepedigreeContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"checkAuthorization","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"createDP1","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"receiveDP2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"retailDP3","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"manufacturer","type":"address"}],"name":"addManufacturer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"distributor","type":"address"},{"name":"meta","type":"string"}],"name":"shipDP1","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"dispensingPoint","type":"address"},{"name":"meta","type":"string"}],"name":"shipDP2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"expected","type":"uint8"}],"name":"wrongPackageStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"meta","type":"string"}],"name":"receiveDP3","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"}],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"n","type":"uint256"}],"name":"meta","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"actual","type":"uint8"},{"indexed":false,"name":"expected","type":"uint8"}],"name":"WrongPackageStatus","type":"event"}]);
var coffeepedigree = coffeepedigreeContract.at("0xc15afe00904bfc8757e97a90ee882ced9bc97c47");


node.authorizeManufacturer = function (id)
{
  web3.personal.unlockAccount(config.bccredentials.admin, config.bccredentials.password);

  return new Promise(function (fulfill, reject)
  {
    coffeepedigree.addManufacturer.sendTransaction(id,{from: config.bccredentials.admin},function (err, data)
    {
      if (err)
      {
        reject(err);
      }
      else
      {
        fulfill(data);
      }
    });
  });

}

node.status = function (itemId)
{
  return coffeepedigree.status.call(itemId);
}

node.meta = function (itemId)
{

  var m = [];
  for(i = 0; i < node.status(itemId); i++) {
    m[i] = JSON.parse(coffeepedigree.meta.call(itemId,i));
  }
  return m;
}

node.packagingDP1 = function (manufacturerName, lotId, itemId, potency, supplier, creationDate, expirationDate) {

  var manufacturer = global.manufacturers.find((item) => {return item.name.toLowerCase() === manufacturerName.toLowerCase()});

  web3.personal.unlockAccount(manufacturer.guid, config.bccredentials.password);

  return new Promise(function (fulfill, reject)
  {

  if( node.status(itemId) != 0)
  {

    reject("The package with id " + itemId + " has already been created. ");
  }

  var tranData = "{ \"manufacturer\": \"" + manufacturer.description+ "\", \"lot\": \"" + lotId
  + "\", \"potency\": \"" + potency + "\", \"supplier\": \""
  + supplier + "\", \"creationDate\": \"" + expirationDate + "\", \"expirationDate\": \""
  + expirationDate + "\", \"packagingDate\": \"" + expirationDate + "\" }";

  coffeepedigree.createDP1.sendTransaction(itemId,tranData,{from: manufacturer.guid ,gas: 500000},function (err, data)
    {
      if (err)
      {

        reject(err);
      }
      else
      {
        fulfill(data);
      }
    });
  });
}

node.shippingDP1 = function (manufacturerName, itemId, distributorName)
{
  var manufacturer = global.manufacturers.find((item) => {return item.name.toLowerCase() === manufacturerName.toLowerCase()});
  var distributor = global.distributors.find((item) => {return item.name.toLowerCase() === distributorName.toLowerCase()});

  return new Promise(function (fulfill, reject)
  {
    if(node.status(itemId) == 0)
    {
      reject("Package id " + itemId + " unknown.");
    }
    else if( node.status(itemId) != 1 )
    {
      reject("The package with id " + itemId + " has already been shipped to distributor.");
    }

    web3.personal.unlockAccount(manufacturer.guid, config.bccredentials.password);

    var tranData = "{ \"distributor\": \"" + distributor.description+ "\", \"departureDate\": \""
    + Date().toString() + "\" }";

    coffeepedigree.shipDP1.sendTransaction(itemId, distributor.guid,tranData,{from: manufacturer.guid,gas: 500000},function (err, data)
      {
        if (err)
        {
          reject(err);
        }
        else
        {
          fulfill(data);
        }
      });
  });
}

node.receivingDP2 = function (distributorName, itemId, shiftOnDuty, shelfLocation, repackaging)
{
  var distributor = global.distributors.find((item) => {return item.name.toLowerCase() === distributorName.toLowerCase()});

  return new Promise(function (fulfill, reject)
  {
    if( node.status(itemId) < 2)
    {
      reject("Package id " + itemId + " not shipped by manufacturer.");

    }
    else if( node.status(itemId) != 2 )
    {
      reject("The package with id " + itemId + " has already been shipped to distributor.");
    }

    web3.personal.unlockAccount(distributor.guid, config.bccredentials.password);

    var tranData = "{ \"arrivalDate\": \"" + Date().toString() + "\", \"shiftOnDuty\": \""
    + shiftOnDuty + "\", \"shelfLocation\":\"" + shelfLocation + "\", \"repackaging\": \"" + repackaging + "\" }";

    coffeepedigree.receiveDP2.sendTransaction(itemId,tranData,{from: distributor.guid,gas: 500000},function (err, data)
      {
        if (err)
        {
          reject(err);
        }
        else
        {
          fulfill(data);
        }
      });

  });
}

node.shippingDP2 = function (distributorName, itemId, retailerName)
{

  var distributor = global.distributors.find((item) => {return item.name.toLowerCase() === distributorName.toLowerCase()});
  var retailer = global.retailers.find((item) => {return item.name.toLowerCase() === retailerName.toLowerCase()});

  return new Promise(function (fulfill, reject)
  {

  if( node.status(itemId) < 3)
  {
      reject("Package id " + itemId + " not received by distributor.");
  }
  else if( node.status(itemId) != 3 )
  {
      reject("The package with id " + itemId + " has already been shipped to retailer.");
  }

  web3.personal.unlockAccount(distributor.guid, config.bccredentials.password);

  var tranData =   "{ \"retailer\": \"" + retailer.description + "\", \"departureDate\": \"" + Date().toString() + "\" }"

  coffeepedigree.shipDP2.sendTransaction(itemId, retailer.guid,tranData,{from: distributor.guid,gas: 500000}, function (err, data)
    {
      if (err)
      {
        reject(err);
      }
      else
      {
        fulfill(data);
      }
    });
  });
}

node.receivingDP3 = function (retailerName, itemId, shiftOnDuty, shopLocation, repackaging)
{
  var retailer = global.retailers.find((item) => {return item.name.toLowerCase() === retailerName.toLowerCase()});

  return new Promise(function (fulfill, reject)
  {
    if( node.status(itemId) < 4)
    {
      reject("Package id " + itemId + " not shipped by distributor.");

    }
    else if( node.status(itemId) != 4 )
    {
      reject("The package with id " + itemId + " has already been received by retailer.");
    }

    web3.personal.unlockAccount(retailer.guid, config.bccredentials.password);

    var tranData = "{ \"arrivalDate\": \"" + Date().toString() + "\", \"shiftOnDuty\": \""+ shiftOnDuty + "\", \"shopLocation\":\"" + shopLocation + "\", \"repackaging\": \"" + repackaging + "\" }"

    coffeepedigree.receiveDP3.sendTransaction(itemId,tranData,{from: retailer.guid,gas: 500000}, function (err, data)
      {
        if (err)
        {
          reject(err);
        }
        else
        {
          fulfill(data);
        }
      });

    });
}

node.sellingDP3 = function (retailerName, itemId)
{
  var retailer = global.retailers.find((item) => {return item.name.toLowerCase() === retailerName.toLowerCase()});

  return new Promise(function (fulfill, reject)
  {
    if( node.status(itemId) < 5)
    {
        reject("Package id " + itemId + " not received by retailer.");
    }
    else if( node.status(itemId) != 5 )
    {
        reject("The package with id " + itemId + " has already been sold.");
    }

    var tranData = "{ \"retailDate\": \"" + Date().toString() + "\" }";

    web3.personal.unlockAccount(retailer.guid, config.bccredentials.password);

    coffeepedigree.retailDP3.sendTransaction(itemId,tranData, {from: retailer.guid,gas: 500000}, function (err, data)
      {
        if (err)
        {
          reject(err);
        }
        else
        {
          fulfill(data);
        }
      });
    });
}

node.scanningDP4 = function(itemId)
{
  if( node.status(itemId) == 0)
  {
    return {productStatusCode:"0", productStatusDescription:"Invalid package id. Either a different product or a counterfeit one.", retailDate:"nil"};
  }
  else if ( node.status(itemId) < 5)
  {
    return {productStatusCode:"0", productStatusDescription:"Supply chain irregularities detected. Either stolen or mishandled product.", retailDate:"nil"};
  }
  else if ( node.status(itemId) == 5)
  {
    return {productStatusCode:"1", productStatusDescription:"Genuine product. Retail sale not confirmed. Please check later.", retailDate:"nil"};
  }
  else
  {
    return {productStatusCode:"1", productStatusDescription:"Genuine product.", retailDate:node.meta(itemId)[5].retailDate};
  }
}


module.exports = node;
