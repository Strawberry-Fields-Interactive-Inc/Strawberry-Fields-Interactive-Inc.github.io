'use strict';


const PORT = process.env.PORT || 8080;
 
const express = require('express');
const path = require('path');
var history = require('connect-history-api-fallback');
 

function setNoCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 2);
  res.set("Expires", date.toUTCString());
  res.set("last-modified",  new Date().toUTCString());
  res.set('Cache-Control', 'no-store')
}


const app = express();
 

function setLongTermCache(res) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  res.setHeader("Expires", date.toUTCString());
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
} 

app.use(history());

// Setup view engine
app.set('view engine', 'html');

app.set('etag', false)

app.use((req, res, next) => {
  setNoCache(res);
  next()
});

app.use(express.static(path.resolve(path.join(__dirname, '/dist'))));

app.get('/', (req, res) => { 
  res.render('index');  
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});