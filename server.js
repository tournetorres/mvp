require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const mongouri = process.env.MONGOURI || 'mongodb://localhost:27017';
console.log(mongouri);
const app = express();

let db;

MongoClient.connect(mongouri, (err, database) => {
  if (err) console.error(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => `listening on ${process.env.PORT}`);

  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

  app.post('/library', (req, res) => {
    db.collection('library').save(req.body, (err, results) => {
      if (err) console.error(err);

      console.log('saved to database');
      res.redirect('/');
    });
  });

  app.get('/', (req, res) => {
    const cursor = db.collection('library').find();
  });

  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    db.collection('library').find().toArray((err, result) => {
      if (err) return console.log(err);
      return res.render('index.ejs', { library: result });
    });
  });
});

