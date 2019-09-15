const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const locals = require('./lib/labels.js');
const _  = require('underscore');
const Q = require('q');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/plus.me'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
const gmail = cb => {
  fs.readFile('credentials.json', (err, content) => {
    if(err) return console.log('Error loading client secret file:', err);
// Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), callGoogle, cb);
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, res) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.YOUR_CLIENT_ID,
  //   process.env.YOUR_CLIENT_SECRET,
  //   process.env.YOUR_REDIRECT_URL
  // );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, res);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    oAuth2Client.setCredentials(token);
  // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
    console.log('Token stored to', TOKEN_PATH);
    });
    callback(oAuth2Client);
    });
  });
}

function getData(config, completion) {
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
}

function callGoogle (auth, cb) {
  "use strict";
  let
    gmail = google.gmail({version: 'v1', auth}),
    array = []
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
          'q': 'after: 1567908000'
        },
      }, (res) => { return {identity: obj, data: res.data} })
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
        }, (res) => { return {identity: val.identity , data: res.data} }) ;
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
                  return t.card
                    .replace('more details » ', '**')
                    .replace(' When','**\n')
                    .replace(/Eastern Time.*$/i,'')
                  // //  .replace('Jawz','Ex')
                  //   .replace('gabrielaldana87@gmail.com', '')
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
    cb(null, results);
  })
  ;
}


/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;

    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        if(label.color)
          console.log(`- ${label.name} ${label.color.textColor} ${label.color.backgroundColor}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

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

const rejectKeys = (array, reject) => {
  "use strict";
  return _.without.apply(_, [array].concat(reject))
};

module.exports = gmail;