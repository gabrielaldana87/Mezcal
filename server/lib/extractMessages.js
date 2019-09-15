const Q = require('q');
const fs = require('fs');
const _  = require('underscore');
const shortid = require('shortid');
const {google} = require('googleapis');
const locals = require('../lib/labels.js');
const extractMessages  = (auth, db, userId) => {
  let
    messages = db.collection('messages'),
    boards = db.collection('boards'),
    array = [],
    gmail = google.gmail({version: 'v1', auth})
  ;
  getData({
    'api': gmail,
    'resource': 'labels',
    'method': 'list',
    'properties': {
      'userId': 'me'
    }
  }, res => {  return res.data })
    .then(results => {
      let labels = results.labels;
      labels.forEach( l => {
        if(l['name'].includes('Schedule/')) { array.push({
            id:l['id'],
            name: l['name']
          }
        );}
      });
      return Q.allSettled(array.map( obj => {
        return getData({
          'api': gmail,
          'resource': 'messages',
          'method': 'list',
          'identity': obj,
          'properties': {
            'userId': 'me',
            'labelIds': obj['id'],
            'q': 'after: 08/02/2019'
          },
        }, res => { return {identity: obj, data: res.data} })
      }));
    })
    .then(results => {
      return Q.allSettled( results.map( list => {
        let val = list['value'];
        return Q.allSettled(val['data']['messages'].slice(0,4).map( message => {
          return getData({
            'api': gmail,
            'resource': 'messages',
            'method': 'get',
            'properties': {
              'userId': 'me',
              'id': message['id'],
              'format': 'minimal'
            }
          }, res => { return {identity: val.identity , data: res.data} } ) ;
        }));
      }));
    })
    .then(results => {
      console.log(results);
      boards.findOne( {
        users: userId
      }, (err, res) => {
        if(err) throw err;
        else {
          // lists: results.map( (o, i) => {
          //   let
          //     fulfillment = o.value,
          //     lists = fulfillment.map(( val, key ) => {
          //       let
          //         labelIds = val.value.data.labelIds,
          //         labelId = val.value.identity.id,
          //         keyFind = rejectKeys(labelIds, ['IMPORTANT', 'CATEGORY_UPDATES', labelId ]),
          //         newMessage = val.value.data,
          //         attributes = _.find(locals, o => o['id'] === keyFind[0]),
          //         id = newMessage.id,
          //         message = Object.assign(newMessage, {type: keyFind}, {attributes: attributes})
          //         ;
          //       return message;
          //     })
          //     ;
          //   return {
          //     _id: array[i]['id'],
          //     title: array[i]['name'],
          //     cards: _
          //       .chain(lists)
          //       .groupBy(o => o['type'])
          //       .map((v,k) => {
          //         return {
          //           _id: k,
          //           messages: v
          //         }
          //       })
          //       .sortBy(o => o._id)
          //       .value()
          //   }
          // });
        }
      })
    })
    .done( results => results );
};

const getData = (config, completion) => {
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
    deferred.resolve(completion(res));
  })
  ;
  return deferred.promise;
};

const gmail = auth => {
  return google.gmail({version: 'v1', auth });
};

const rejectKeys = (array, reject) => {
  "use strict";
  return _.without.apply(_, [array].concat(reject))
};

module.exports = extractMessages;
