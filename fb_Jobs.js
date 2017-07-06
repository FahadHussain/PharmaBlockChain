'use strict';

var node = require('./bc.js');
var config = require('./config.js');
var fieldbook = require('node-fieldbook');

var book = new fieldbook
(
  {
  username: config.fb.username,
  password: config.fb.password,
  book: config.fb.book
  }
);

var fb = {};


//Load Master Data - I
fb.LoadMasterData = function ()
{
  var filter = {status: 'Approved'};

  book.getSheet('manufacturers', filter).then((data) =>
  {
    global.manufacturers = data;
  })
  .catch((error) =>
  {

  });

  book.getSheet('distributors', filter).then((data) =>
  {
    global.distributors = data;
  })
  .catch((error) =>
  {

  });

  book.getSheet('retailers', filter).then((data) =>
  {
      global.retailers = data;
  })
  .catch((error) =>
  {

  });
}




//Synch Manufacturers - I
fb.SyncManufacturers = function ()
{
  var filter = {status: 'Pending'};
  book.getSheet('manufacturers', filter).then((data) =>
  {
    data.forEach(function(item)
    {
      node.authorizeManufacturer(item.guid).then(function(tran_no)
      {
        fb.UpdateManufacturer(item.id, tran_no,config.fb.baseURL+tran_no);
      });
    });
  })
  .catch((error) =>
  {

  });
}

//Update Manufacturers - I
fb.UpdateManufacturer = function (id,tran_no,url)
{
  var data = { 'status': 'Approved', 'tran_no' : tran_no, 'url': url };
  book.updateRecord('manufacturers', id, data)
      .then((data) =>
      {
        console.log("Record Updated - " + id + "\n" )
      })
      .catch((error) =>
      {
        console.log(error);
      });
}




//Sync Manufacturer ERP - I
fb.SyncManufacturerERP = function ()
{
  var manufacturerName ='pfizer';

  var filter = {packaging_status: 'Package Item'};

  book.getSheet('pfizer_manufacturer', filter).then((data) =>
  {

    data.forEach(function(item)
    {
      var promise1 = node.packagingDP1(manufacturerName,item.lot_no,item.item_id,"","",Date().toString(), Date().toString());

      promise1.then(function(p_tran_no)
      {
        var data = { 'packaging_status': 'Packaged', 'packaging_tran_no' : p_tran_no, 'packaging_tran_url': config.fb.baseURL + p_tran_no, 'error_message': '' };
        fb.UpdateManufacturerERP(item.id, data);
      });
      promise1.catch(function(error)
      {

        var data = { 'error_message': error};
        fb.UpdateManufacturerERP(item.id, data);
      });


    });
  })
  .catch((error) =>
  {

  });


  var filter = {shipping_status: 'Ship Item'};
  book.getSheet('pfizer_manufacturer', filter).then((data) =>
  {
    data.forEach(function(item)
    {
      var promise2 = node.shippingDP1(manufacturerName,item.item_id,item.distributor_name);

      promise2.then(function(s_tran_no)
      {
        var data = { 'shipping_status': 'Shipped', 'shipping_tran_no' : s_tran_no, 'shipping_tran_url':  config.fb.baseURL + s_tran_no,'error_message': '' };
        fb.UpdateManufacturerERP(item.id,data);
      });
      promise2.catch(function(error)
      {
        console.log(error);
        var data = { 'error_message': error};
        fb.UpdateManufacturerERP(item.id, data);
      });


    });
  })
  .catch((error) =>
  {

  });

}

//Update Manufacturer ERP - I
fb.UpdateManufacturerERP = function (id, data)
{
  console.log(id);
  console.log(data);
  book.updateRecord('pfizer_manufacturer', id, data)
      .then((data) =>
      {
        console.log("Record Updated - " + id + "\n" )
      })
      .catch((error) =>
      {
        console.log(error);
      });
}




//Sync Distributor ERP - I
fb.SyncDistributorERP = function ()
{

  var distributorName ='sigma';
  var filter = {receiving_status: 'Receive Item'};

  book.getSheet('sigma_distributor', filter).then((data) =>
  {
    data.forEach(function(item)
    {
      var promise1 = node.receivingDP2(distributorName,item.item_id,"Night",item.shelf_location,"None");
      promise1.then(function(p_tran_no)
      {
        console.log(p_tran_no);
        var data = { 'receiving_status': 'Received', 'receiving_tran_no' : p_tran_no, 'receiving_tran_url': config.fb.baseURL + p_tran_no,'error_message': '' };
        fb.UpdateDistributorERP(item.id, data);
      });

      promise1.catch(function(error)
      {
        console.log(error);
        var data = { 'error_message': error};
        fb.UpdateDistributorERP(item.id,data);
      });

    });
  })
  .catch((error) =>
  {

  });


  var filter = {shipping_status: 'Ship Item'};
  book.getSheet('sigma_distributor', filter).then((data) =>
  {
    console.log(data);
    data.forEach(function(item)
    {
      var promise2 = node.shippingDP2(distributorName,item.item_id,item.retailer_name);
      promise2.then(function(s_tran_no)
      {
        console.log(s_tran_no);
        var data = { 'shipping_status': 'Shipped', 'shipping_tran_no' : s_tran_no, 'shipping_tran_url':  config.fb.baseURL + s_tran_no, 'error_message': '' };
        fb.UpdateDistributorERP(item.id,data);
      })

      promise2.catch(function(error)
      {
        var data = { 'error_message': error};
        fb.UpdateDistributorERP(item.id,data);
      });

    });
  })
  .catch((error) =>
  {

  });

}

//Update Distributor ERP - I
fb.UpdateDistributorERP = function (id, data)
{
  book.updateRecord('sigma_distributor', id, data)
      .then((data) =>
      {
        console.log("Record Updated - " + id + "\n" )
      })
      .catch((error) =>
      {
        console.log(error);
      });
}





//Sync Retailer ERP - I
fb.SyncRetailerERP = function ()
{

  var retailerName ='boots';
  var filter = {receiving_status: 'Receive Item'};

  book.getSheet('boots_retailer', filter).then((data) =>
  {
    data.forEach(function(item)
    {
      var promise1 = node.receivingDP3(retailerName,item.item_id,"Night",item.shelf_location,"None");
      promise1.then(function(p_tran_no)
      {
        console.log(p_tran_no);
        var data = { 'receiving_status': 'Received', 'receiving_tran_no' : p_tran_no, 'receiving_tran_url': config.fb.baseURL + p_tran_no,'error_message': '' };
        fb.UpdateRetailerERP(item.id, data);
      });

      promise1.catch(function(error)
      {
        console.log(error);
        var data = { 'error_message': error};
        fb.UpdateRetailerERP(item.id,data);
      });

    });
  })
  .catch((error) =>
  {

  });


  var filter = {selling_status: 'Sell Item'};
  book.getSheet('boots_retailer', filter).then((data) =>
  {
    console.log(data);
    data.forEach(function(item)
    {
      var promise2 = node.sellingDP3(retailerName,item.item_id);
      promise2.then(function(s_tran_no)
      {
        console.log(s_tran_no);
        var data = { 'selling_status': 'Sold', 'selling_tran_no' : s_tran_no, 'selling_tran_url':  config.fb.baseURL + s_tran_no, 'error_message': '' };
        fb.UpdateRetailerERP(item.id,data);
      })

      promise2.catch(function(error)
      {
        var data = { 'error_message': error};
        fb.UpdateRetailerERP(item.id,data);
      });

    });
  })
  .catch((error) =>
  {

  });

}

//Update Retailer ERP - I
fb.UpdateRetailerERP = function (id, data)
{
  console.log(id);
  console.log(data);
  book.updateRecord('boots_retailer', id, data)
      .then((data) =>
      {
        console.log("Record Updated - " + id + "\n" )
      })
      .catch((error) =>
      {
        console.log(error);
      });
}

//
fb.GetCompleteMetaData = function()
{
  var filter = {};
//var filter = {item_id : '9100000031'}
  var Items = [];

  return new Promise(function (fulfill, reject)
  {
    book.getSheet('pfizer_manufacturer', filter).then((data) =>
    {
      data.forEach(function(item)
      {
      var bcvalues = node.meta(item.item_id);
      bcvalues.forEach(function(bcitem)
      {
        for(var key in bcitem)
        {
          item[key] = bcitem[key];
        }
      });

      var myObj= item;
      Items.push(myObj);

    });
      fulfill(Items);
    })
    .catch((error) =>
    {

    });
  });
}

  fb.LoadMasterData();




module.exports = fb;
