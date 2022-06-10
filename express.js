const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const requests = require('./server/request.json');

// console.log(requests);
const port = 3000;
let currentRequest;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
  // res.send(auto.AutoDict);
})

app.listen(port, () => {
  console.log(`Listening port ${port}`);
})

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

app.post('/reg_service/api/v1/request', (req, res) => {
  currentRequest = {
    id: requests.length + 1,
    status: {
      code: 'DRAFT'
    },
    createDate: new Date().toISOString()
  };
  requests.push(currentRequest);
  res.send(currentRequest);
})

app.post('/reg_service/api/v1/request/registration', (req, res) => {
  // currentRequest.person = req.body.person;
  res.send(currentRequest);
})
app.put('/reg_service/api/v1/request', (req, res) => {
  currentRequest.person = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    driverLicense: req.body.driverLicense,
    email: req.body.email
  };
  currentRequest.auto = {
    brand: req.body.brand,
    model: {
      id: req.body.auto.model.id,
      name: req.body.auto.model.name
    }
  };
  currentRequest.city = {
    code: req.body.city.code,
    name: req.body.city.name
  };
  res.send(currentRequest);
})