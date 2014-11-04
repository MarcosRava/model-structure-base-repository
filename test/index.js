var Repository = require('../index.js');
var Customer = require('model-structure/test/fixtures/models/customer.js');
var repository;
var RepositoryTest = function RepositoryTest(args) {
  args = args || {};
  repository = new Repository(Customer);
};

RepositoryTest.prototype.create = create;
RepositoryTest.prototype.get = get;
RepositoryTest.prototype.load = load;
RepositoryTest.prototype.update = update;
RepositoryTest.prototype.destroy = destroy;

var datas = {};

function create(data) {
  return repository.create(data, function(result, deferred) {
    data.id = new Date().getTime();
    datas[data.id] = data;
    deferred.resolve(data);
    return deferred.promise;
  });
}

function load(args) {
  args = args || {};
  return repository.load(args, function(result, deferred) {
    var data;
    if (args.id) {
      data = datas[args.id];
    }
    deferred.resolve(data);
    return deferred.promise;

  });
}

function get(args) {
  var data = [];
  return repository.get(args, function(result, deferred) {
    for (var i in datas) data.push(JSON.parse(JSON.stringify(datas[i])));
    deferred.resolve(data);
    return deferred.promise;
  });
}

function update(data) {
  return repository.update(data, function(result, deferred) {
    datas[data.id] = data;
    deferred.resolve(data);
    return deferred.promise;
  });
}

function destroy(data) {
  return repository.destroy(data, function(result, deferred) {
    delete datas[data.id];
    deferred.resolve(data);
    return deferred.promise;
  });
}






















var rep = new RepositoryTest();

//rep.create(new Customer({name:"Marcos", email:"marcos@gmail.com"}, {validators:[]}))
//.then(function(result) {
//  console.log(result);
//  return result;
//})
//.then(rep.load)
//.then(function(result) {
//  console.log(result);
//  return result;
//})
//.then(rep.get)
//.then(function(result) {
//  console.log(result);
//  return result;
//})
//.fail(function(result) {
//  console.log("error -> ", result);
//});
//



var request = require('request');

var RestRepository = require('../src/rest-repository.js');
var Q = require('q');
function restCreate(host, data) {
  return Q.promise(function (resolve, reject, notify) {
    request.post({url:host, body:data, json:true}, function(error, response, body) {
      if (error) {
        return reject(error);
      }
      resolve(body);
    });
  });
}







var restRep = new RestRepository({
  Model: Customer,
  host: "http://ricositeapi.apiary-mock.com/",
  actions: {
    create: {
      method: restCreate,
      host: "http://ricositeapi.apiary-mock.com/api/customer/products/fixed-income/buy/"
    }
  }
});


restRep.create(new Customer({name:"Marcos", email:"marcos@gmail.com"}, {validators:[]}))
.then(function(result) {
  console.log(result);
  return result;
})
//.then(rep.load)
//.then(function(result) {
//  console.log(result);
//  return result;
//})
//.then(rep.get)
//.then(function(result) {
//  console.log(result);
//  return result;
//})
.fail(function(result) {
  console.log("error -> ", result);
});
