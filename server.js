require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// const rp = require('request-promise');
const path = require('path');

const mongouri = process.env.MONGOURI || 'mongodb://localhost:27017';
// console.log(mongouri);
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));


let db;

MongoClient.connect(mongouri, (err, database) => {
  if (err) console.error(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => `listening on ${process.env.PORT}`);
});

app.post('/library', (req, res) => {
  db.collection('library').save(req.body, (err, results) => {
    if (err) res.send(err);
    console.warn('saved to database');
    res.send(results);
  });
  // console.log(req.body);
});


app.delete('/library', (req, res) => {
  db.collection('library').remove(req.body, (err, results) => {
    if (err) res.send(err);
    console.warn('removed from database');
    res.send(results);
  });
  // console.log(req.body);
});

// route stuff
// app.post('/library', (req, res) => {

// });
//
// app.get('/', (req, res) => {
//   const cursor = db.collection('library').find();
//   console.warn(res.body, cursor);
// });
//
// app.get('/', (req, res) => {
//   db.collection('library').find().toArray((err, result) => {
//     if (err) return console.warn(err);
//     return res.render('index.ejs', { library: result });
//   });
// });
// //////////////////

// const options = {
//   uri: 'https://www.googleapis.com/books/v1/volumes?',
//   qs: {
//     KEY: process.env.API_KEY, // -> uri + '?access_token=xxxxx%20xxxxx'
//   },
//   headers: {
//     'User-Agent': 'Request-Promise',
//   },
//   json: true, // Automatically parses the JSON string in the response
// };

// rp(options)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     // API call failed...
//   });
