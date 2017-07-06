var db = {};

var config = require('./config.js');
var mongoose = require('mongoose');
var RolesSchema;
var Roles;

RolesSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  enum: ['manufacturer', 'distributor','retailer','administrator' ]
});

Roles = mongoose.model('Roles', RolesSchema);


db.OpenConnection = function ()
{
  mongoose.connect(config.database.hostaddress);
}

db.CloseConnection = function ()
{
  mongoose.disconnect();
}


db.AddRole = function (pid, pname, pdescription, ptype)
{
  var Role = new Roles({_id: pid, name: pname, description: pdescription, enum:ptype});
  Role.save(function(err)
  {
    if(err)
      return err;
    else
      return true;
  });
}

db.FindRole = function(key)
{

  var Roles = mongoose.model('Roles', RolesSchema);
  return new Promise(function (fulfill, reject)
  {
    Roles.find(key,function (err, data)
    {
      if (err)
      {
        reject(err);
      }
      else
      {
        var Items = [];
        data.forEach(function(item)
        {
          var myObj= { "Id":item._id, "Name":item.name,"Description":item.description };
          Items.push(myObj);
        });

        fulfill(Items);
      }
    });
  });
}

module.exports = db;
