const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const locals = require('./labels.js');
const _  = require('underscore');
const Q = require('q');
const { timeSunday } = require('../../client/node_modules/d3');

const getData = (config, completion) => {
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

const extractMessagesToCreateBoard = (auth, callback) => {
  let
    gmail = google.gmail({version: 'v1', auth}),
    array = [],
    now = new Date(),
    afterDt = timeSunday.floor(now).getTime() / 1000 ,
    beforeDt = timeSunday.ceil(now).getTime() / 1000
  ;
   getData({
    'api': gmail,
    'resource': 'labels',
    'method': 'list',
    'properties': {
      'userId': 'me'
    }
  }, (res) => {  return res.data })
  .then(results => {
    let labels = results.labels;
    labels.forEach( l => {
      if(l['name'].includes('Schedule/')) { array.push({
        id:l['id'],
        name: l['name']
        });}
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
          'q': `after:${ afterDt } before:${ beforeDt }`
        },
      }, res => { return {identity: obj, data: res.data} })
    }));
  })
  .then(results => {
    return Q.allSettled( results.map( list => {
      let val = list['value'];
      let messages = val['data']['messages'] ? val['data']['messages'] : [];
        return Q.allSettled(messages.slice(0,50).map( message => {
          return getData({
            'api': gmail,
            'resource': 'messages',
            'method': 'get',
            'properties': {
              'userId': 'me',
              'id': message['id'],
              'format': 'minimal'
            }
        }, res => { return {identity: val.identity , data: res.data} }) ;
      }));
    }));
  })
  .then(results => {
      let obj = {
      _id: '1',
      title: 'Productivity Board',
      color: 'blue',
      lists:  results.map( (o,i) => {
        let
          fulfillment  = o.value,
          lists = fulfillment.map((val, key) => {
            let
              labelIds = val.value.data.labelIds,
              labelId = val.value.identity.id,
              keyFind = rejectKeys(labelIds, ['IMPORTANT', 'CATEGORY_UPDATES', labelId ]);
            return {
              _id: val.value.data.id,
              type: keyFind,
              category: labelId,
              attributes: _.find(locals, o => o['id'] === keyFind[0]),
              card: val.value.data.snippet
            }
          })
          ;
        return {
          _id: array[i]['id'],
          title: array[i]['name'],
          cards: _
            .chain(lists)
            .groupBy(o => o['type'])
            .map((v,k) => {
              let
                primary = v[0],
                color = primary.attributes ? primary.attributes.color :
                  { textColor: 'white', backgroundColor: 'black' },
                name = primary.attributes ? primary.attributes.name : 'Classify';
              return {
                _id: k,
                color: color['textColor'],
                background: color['backgroundColor'],
                text: [`### ${name}\n`].concat(v.map(t => {
                  // i have to pass the id of the message which is t._id
                  let text = `**${t.card}`;
                  return text
                    .replace('more details » ', '')
                    .replace(' When','**\n'  )
                    .replace(/Eastern Time.*$/i, '')
                    .concat(`\n{${t._id}}`)
                   //  .replace('Resume', 'Something')
                   //  .replace('WhiteStrips', 'Something')
                   // .replace('Jawz','Ex')
                    .replace('gabrielaldana87@gmail.com', '')
                })).join('\n\t\n')
              }
            })
            .sortBy(o => o._id)
            .value()
        }
      })
    }
    ;
    return obj;
  })
  .done( results => {
    callback(results);
  })
  ;
};

function listConnectionNames(auth) {
  const service = google.people({version: 'v1', auth});
  service.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos'
  }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    console.log(res);
  });
}

const rejectKeys = (array, reject) => _.without.apply(_, [array].concat(reject));

module.exports = extractMessagesToCreateBoard;