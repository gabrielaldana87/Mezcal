const express = require('express');
const router = express.Router();
const configurePassport =  require('../config/passport');
const callGoogleApi = require('../config/google');
const groupLabelCategories = require('../lib/groupLabelCategories');
const goalData = require('../lib/goalClassifications.json');
const extractMessagesToCreateBoard = require('../lib/extractMessagesToCreateBoard');
const data = require('../lib/goalClassifications');
const labels = require('../lib/labels');
const moment = require('moment');
/* Connect to Google API */

const api = db => {
  "use strict";
  //ROOT
  router.get('/', (req, res) => configurePassport(db, (err, user) => {
    res.redirect('/boards');
  }))
  ;
  //USER
  router.get('/user', (req, res) => configurePassport(db, (err, user) => {
    res.send(user);
  }))
  ;
  //BOARDS
  router.get('/boards' , (req, res) =>
    callGoogleApi(auth => {
    extractMessagesToCreateBoard(auth, boards =>
      res.send(boards)
    );
  }))
  ;
  //CATEGORIES
  router.get('/categories', (req, res) => callGoogleApi( auth => {
    groupLabelCategories(auth, data => res.send(data)) ;
  }))
  ;
  //LABELS
  router.get('/labels', (req, res) => res.send( labels ) )
  ;
  //NOTES
  router.get('/notes', (req, res, next) => {
    const obj = {};
    const notes = db.collection('notes');
    notes.find({}).toArray( (err, docs) => {
      if (err) { next (err);}
      else {
        docs.map(o => obj[o.categoryId] = {
          labelDesc: labels.find(l => l.id === o.categoryId ),
          tasks: docs.filter(k =>  k.categoryId == o.categoryId  ) });
        res.send(obj);
      }
    });
  })
  ;
  router.get('/notes/:msgId', (req, res, next) => {
    const msgId = req.params.msgId;
    const notes = db.collection('notes');
    notes.findOne({ msgId: msgId }, (err, doc) => {
      if (err) { next(err);}
      else {
        res.send(doc);
      }
    })
  })
  ;
  router.post('/notes', (req, res, next) => {
    const
      message = req.body,
      users = db.collection('users'),
      notes = db.collection('notes'),
      options = { upsert: true, returnNewDocument: true },
      { msgId } = message
      ;
    notes.findOneAndUpdate({ msgId: msgId }, { $set: message }, options, (err, doc) => {
      if (err) { next(err);}
      else {
        res.send(doc);
      }
    })
  })
  ;
  router.put('/notes', (req, res, next) => {
    const
      message = req.body,
      notes = db.collection('notes'),
      task = message.task,
      msgId = message.msgId,
      options = { upsert: true, returnOriginal: false }
      ;
    notes.findOne({ msgId: msgId }, (err, doc) => {
      notes.findOneAndUpdate({
        _id: doc._id
      }, {
        $set: {
          noteText: doc.noteText.split('\n').map(o => o.includes(task) ? '\n' : o ).join('\n')
        }
      }, options, (err, doc) => {
        if (err) { next(err); }
        else {
          res.send(doc);
        }
      })
    });
  })
  ;
  // GOALS
  router.get('/goals_class/:label_id', (req, res) => {
    const id = req.params.label_id;
    res.send(goalData['goal_classifications'].filter(o => o['id'] === id));
  })
  ;
  router.get('/goals/:msgId', (req, res, next) => {
    const msgId = req.params.msgId;
    const goals = db.collection('goals');
    goals.findOne({ id: msgId }, (err, doc) => {
      if (err) { next(err);}
      else {
        res.send({document: doc});
      }
    })
  })
  ;
  router.post('/goals', (req, res, next) => {
    const
      message = req.body,
      goals = db.collection('goals'),
      options = { upsert: true, returnOriginal: false },
      { time, id } = message,
      timeString = time.split(' – '),
      parseDt = 'ddd MMM D, YYYY H:mma',
      momentStart = moment(timeString[0], parseDt),
      date = momentStart.format('ddd MMM D, YYYY'),
      momentEnd = moment(`${date} ${timeString[1]}`, parseDt),
      duration = momentEnd.diff(momentStart, 'hours', true)
      ;
    goals.findOneAndUpdate({id: id }, { $set: { ...message, duration } }, options, (err, doc) => {
      if (err) { next(err);}
      else {
        res.send(doc);
      }
    })
  })
  ;
  return router
  ;
};

module.exports = api;