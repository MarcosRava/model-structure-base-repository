var Repository;
var Q = require('q');

Repository = function Repository(ModelInstance) {
   this.ModelInstance = ModelInstance;
};

Repository.prototype.create = create;
Repository.prototype.get = get;
Repository.prototype.load = load;
Repository.prototype.destroy = destroy;
Repository.prototype.update = update;

function create(data, createFunction) {
  var Model = this.ModelInstance;
  if (!(data instanceof Model)) {
    data = new Model(data);
  }
  return data.isValid()
  .then(function() {
    return createFunction(data, Q.defer())
    .then(function (result) {
      return new Model(result);
    });
  });
}

function get(data, getFunction) {
  var Model = this.ModelInstance;
  var datas = [];
  return getFunction(data, Q.defer())
  .then(function (result) {
    for (var i in result) {
      datas.push(new Model(result[i]));
    }
    return datas;
  });
}

function load(data, loadFunction) {
  var Model = this.ModelInstance;
  var datas = [];
  return loadFunction(data, Q.defer())
  .then(function(result) {
    return new Model(result);
  });
}

function destroy(data, destroyFunction) {
  var Model = this.ModelInstance;
  var datas = [];
  return destroyFunction(data, Q.defer())
  .then(function(result) {
    return new Model(result);
  });
}


function update(data, updateFunction) {
  var Model = this.ModelInstance;
  if (!(data instanceof Model)) {
    data = new Model(data);
  }
  return data.isValid()
  .then(function() {
    return updateFunction(data, Q.defer())
    .then(function (result) {
      return new Model(result);
    });
  });
}
module.exports = Repository;
