const Q = require('q');

const getData = (config) => {
  "use strict";
  let
    api = config.api,
    resource = config.resource,
    method = config.method,
    properties = config.properties,
    deferred = Q.defer()
    ;
  api.users[resource][method](properties, (err, res) => {
    if (err) return console.log( `The API returned an error: ${err}` );
    deferred.resolve(res) ;
  })
  ;
  return deferred.promise;
};



module.exports = getData;
