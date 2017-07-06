var Fieldbook = require('node-fieldbook');

var book = new Fieldbook(
  {
  username: 'key-1',
  password: '2TlJKnhbVkAPP5EubUBB',
  book: '58d6ced049ee860300e92ada'
});
//
// var data = { name: 'faraz', description:"sample" };
//
// book.addRecord('manufacturers', data)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//

//
// book.getSheets()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//
  //  filter = {};
//
//   book.getSheet('supply_chain_management_erp', filter)
//     .then((data) => {
//
//       console.log(data);
// //      console.log(data[0].manufacturers[0].id);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

    //

    var data = { item_name: 'https://testnet.etherscan.io/tx/0xe6c1a1f1cad6d2ad803a6f971882ba582c777a9589d6f60f4356a8f8d005908f' };

    book.updateRecord('supply_chain_management_erp', 6, data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });




var data = [ { id: 1,
    record_url: 'https://fieldbook.com/records/58d6d19749ee860300e92af1',
    guid: '0x4b702981f815d22bcc344bbdcf02abac1523ca55',
    name: 'Alice',
    description: 'Alice Coffee International Inc.',
    status: 'Pending',
    tran_no: null,
    url: null },
    { id: 2,
    record_url: 'https://fieldbook.com/records/58d78ffc1fbc9a0300a5f7c8',
    guid: '0x2de67c5a3c0bc13dabe5813f8763db0c341cd19d',
    name: 'Bob',
    description: 'Bob\'s Fair Trade Coffee LLC.',
    status: 'Pending',
    tran_no: null,
    url: null } ];


    data.forEach(function(item)
    {
      console.log(item);
    });




    fb.LoadMasterData();

    var millisecondsToWait = 15000;
    setTimeout(function() {

    //node.shippingDP1('pfizer', "101", 'carol');

    //node.receivingDP2('carol', '101', "Night", "A1", "")

    //node.receivingDP3('Boots', '101', "Night", "UK", "")

    //node.sellingDP3('Boots', '101');


    }, millisecondsToWait);





    // API Functions
    // manufacturers Function
    app.get('/api/manufacturers', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = db.FindRole({enum: ['manufacturer']});
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));

      });
      promise.catch(function(error)
      {
        throw error;
      });

    });

    // API Functions
    // distributors Function
    app.get('/api/distributors', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = db.FindRole({enum: ['distributor']});
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));

      });
      promise.catch(function(error)
      {
        throw error;
      });

    });

    // API Functions
    // retailers Function
    app.get('/api/retailers', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = db.FindRole({enum: ['retailer']});
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));

      });
      promise.catch(function(error)
      {
        throw error;
      });

    });

    // API Functions
    // authorizeManufacturer Function
    //api/authorizeManufacturer/0xa8e9a836eb9599efedef183f71f1156bc86cee29002cae883819885ddad81a24
    app.get('/api/authorizeManufacturer/:itemID', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');
      node.authorizeManufacturer(req.params.itemID).then(function(data)
    {
      response.data = data;
      res.send(JSON.stringify(response));
    });
    });


    // API Functions
    // Status Function
    // /api/packagingDP1/
    app.post('/api/packagingDP1/:itemID', function(req, res)
    {
        //req.body.creationDate
      res.status(200);
      res.set('Content-Type', 'application/json');
      var promise = node.packagingDP1(req.body.manufacturerId, req.body.lotId, req.params.itemID, req.body.potency, req.body.supplier, Date().toString(), req.body.expirationDate);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });

    // API Functions
    // Status Function
    // /api/shippingDP1/
    app.post('/api/shippingDP1/:itemID', function(req, res)
    {

      res.status(200);
      res.set('Content-Type', 'application/json');
      var promise = node.shippingDP1(req.body.manufacturerId, req.params.itemID, req.body.distributorId);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });


    // API Functions
    // Status Function
    // /api/receivingDP2/
    app.post('/api/receivingDP2/:itemID', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = node.receivingDP2(req.body.distributorId, req.params.itemID, req.body.shiftOnDuty, req.body.shelfLocation, req.body.repackaging);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });


    // API Functions
    // Status Function
    // /api/shippingDP2/
    app.post('/api/shippingDP2/:itemID', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = node.shippingDP2(req.body.distributorId, req.params.itemID, req.body.retailerId);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });

    // API Functions
    // Status Function
    // /api/receivingDP3/
    app.post('/api/receivingDP3/:itemID', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = node.receivingDP3(req.body.retailerId, req.params.itemID, req.body.shiftOnDuty, req.body.shopLocation, req.body.repackaging);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });

    // API Functions
    // Status Function
    // /api/sellingDP3/
    app.post('/api/sellingDP3/:itemID', function(req, res)
    {
      res.status(200);
      res.set('Content-Type', 'application/json');

      var promise = node.sellingDP3(req.body.retailerId, req.params.itemID);
      promise.then(function(data)
      {
        response.data = data;
        res.send(JSON.stringify(response));
      });

      promise.catch(function(error)
      {
        response.data = error;
        res.send(JSON.stringify(response));
      });

    });



    // API Functions
    // Status Function
    app.get('/api/status/:itemID', function(req, res)
    {
      res.status(200);

      res.set('Content-Type', 'application/json');
      response.data = node.scanningDP4(req.params.itemID);
      res.send(JSON.stringify(response));
    });
