const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(port, () => {
  console.log(`Listening port ${port}`);
})

app.get('/reg_service/api/v1/dictionary/DICT_CITIES', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'cities.json'));
})

app.get('/reg_service/api/v1/dictionary/DICT_AUTO', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'auto.json'));
})

app.use(express.static(path.resolve(__dirname, 'server')));