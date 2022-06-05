const express = require('express');
const path = require('path');
const app = express();
// const auto = require('./server/auto');
const requests = require('./server/request.json');
// console.log(requests);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world');
  // res.send(auto.AutoDict);
})

app.listen(port, () => {
  console.log(`Listening port ${port}`);
})

// app.get('/user/:id', function (req, res) {
//   res.send('user ' + req.params.id)
// })

// id =  DICT_AUTO (справочник с марками и моделями автомобилей)
// id = DICT_CITIES (Справочник с возможными городами) 

// GET /reg_service/api/v1/request/:id

// app.get('/reg_service/api/v1/dictionary/:DICT_CITIES', (req, res) => {
app.get('/reg_service/api/v1/dictionary/DICT_CITIES', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'cities.json'));
  // req.params();
})

app.get('/reg_service/api/v1/dictionary/DICT_AUTO', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'server', 'auto.json'));
})

app.get('/reg_service/api/v1/requests', (req, res) => {
  res.send(requests);
})

app.get('/reg_service/api/v1/request/:id', (req, res) => {

  const reqID =  req.params.id;
  const currentReq = requests.find((item) => item.id == reqID);
  res.send(currentReq);
  
})

app.get('/reg_service/api/v1/request/status/:id', (req, res) => {

  const reqID =  req.params.id;
  const currentReq = requests.find((item) => item.id == reqID);
  const currentCode = currentReq.status.code;
  res.send(currentCode);

})



// app.use(express.static(path.resolve(__dirname, 'server')));