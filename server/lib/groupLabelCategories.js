const Q = require('q');
const _  = require('underscore');
const {google} = require('googleapis');
const locals = require('../lib/labels.js');
const getData = require('../lib/getData');
const moment = require('moment');
const { timeSunday } = require('../../client/node_modules/d3');

const extractLabelCategories = (auth, completion) => {
  let
    gmail = google.gmail({version: 'v1', auth}),
    array = [],
    now = new Date(),
    afterDt = timeSunday.floor(now).getTime() / 1000, //1586059200,
    beforeDt = timeSunday.ceil(now).getTime() / 1000 //1586577540
  ;
  getData({
    'api': gmail,
    'resource': 'labels',
    'method': 'list',
    'properties': {
      'userId': 'me'
    }
  })
  .then(results => {
    let labels = results.data.labels;
    labels.forEach( l => {
      if(l['name'].includes('Fulfillment/')) { array.push({
        id:l['id'],
        name: l['name']
      });}
    });
    return Q.allSettled(array.map( obj => {
      let arr = [];
      const getPageOfMessages = (request, result) => {
        return request.then( resp => {
          result = result.concat(resp.data.messages);
          let nextPageToken = resp.data.nextPageToken;
          if (nextPageToken) {
            query.properties.pageToken = nextPageToken;
            request = getData(query)
            ;
            getPageOfMessages(request, result)
          } else { arr.push({id: obj.id, name: obj.name, messages: result }); }
          return arr;
        });
      }
      ;
      let query = {
          'api': gmail,
          'resource': 'messages',
          'method': 'list',
          'identity': obj,
          'properties': {
            'userId': 'me',
            'labelIds': obj['id'],
            'q': `after:${ afterDt } before:${ beforeDt }`
          }
        }
      ;
      let initialRequest = getData(query)
      ;
      return getPageOfMessages(initialRequest, [])
    }));
  })
  .then(results => {
    return Q.allSettled(results.map( o => {
      return Q.allSettled(o.value.map( category => {
        let
          art = [],
          id = category.id,
          name = category.name,
          messages = category.messages ? category.messages : []
        ;
        return Q.allSettled(messages.slice(0, 50).map( message => {
          if (!message) return;
          const getLabelOfMessages = (request, result) => {
             return request.then( resp => {
              let
                timeString = resp.data.snippet
                  .match('When (.*) Eastern Time')[1]
                  .split(' – '),
                parseDt = 'ddd MMM D, YYYY H:mma',
                momentStart = moment(timeString[0], parseDt),
                date = momentStart.format('ddd MMM D, YYYY'),
                momentEnd = moment(`${date} ${timeString[1]}`, parseDt),
                brief = resp.data.snippet
                  .replace('more details » ', '**')
                  .replace(' When','**')
                  .replace(/Eastern Time.*$/i,''),
                labelIds = resp.data.labelIds,
                keyFind = rejectKeys(labelIds, ['IMPORTANT', 'CATEGORY_UPDATES', id])
              ;
              return array.map( z => {
               if(z.id === id) {
                 art.push({
                   key: keyFind[0],
                   snippet: brief,
                   duration: momentEnd.diff(momentStart, 'hours', true)
                 });
                 return z.completion = art;
               }
              });
            })
          };
          let messageRequest = getData({
            'api': gmail,
            'resource': 'messages',
            'method': 'get',
            'properties': {
              'userId': 'me',
              'id': message['id'],
              'format': 'minimal'
            }
          })
          ;
          return getLabelOfMessages(messageRequest, [])
        }));
      })
      )
    })
    )
  })
  .done( () => completion(array))
};

const rejectKeys = (array, reject) => _.without.apply(_, [array].concat(reject));

module.exports = extractLabelCategories;