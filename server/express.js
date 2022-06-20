const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const requestsList = [];

const port = 3000;
let currentRequest;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
})

app.listen(port, () => {
  console.log(`Listening port ${port}`);
})

app.get('/reg_service/api/v1/dictionary/DICT_CITIES', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'cities.json'));
  // res.sendFile(path.resolve(__dirname, 'server', 'cities.json'));
})

app.get('/reg_service/api/v1/dictionary/DICT_AUTO', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'auto.json'));
  // res.sendFile(path.resolve(__dirname, 'server', 'auto.json'));
})

app.get('/reg_service/api/v1/requests', (req, res) => {
  res.send(requestsList);
  // res.send(requests);
})

app.get('/reg_service/api/v1/request/:id', (req, res) => {
  const requestId =  req.params.id;
  const currentReq = requestsList.find((item) => item.id == requestId);
  // const currentReq = requests.find((item) => item.id == requestId);
  res.send(currentReq);
})

app.get('/reg_service/api/v1/request/status/:id', (req, res) => {
  const requestId =  req.params.id;
  const currentReq = requestsList.find((item) => item.id == requestId);
  // const currentReq = requests.find((item) => item.id == requestId);
  const currentCode = currentReq.status.code;
  res.send(currentCode);
})

app.post('/reg_service/api/v1/request', (req, res) => {
  currentRequest = {
    id: requestsList.length ? requestsList.length + 1 : 1,
    status: {
      code: 'DRAFT'
    },
    person: {
      lastName:  null,
      firstName:  null,
      secondName:  null,
      driverLicense:  null,
      email:  null
    },
    auto: {
      brand:  null,
      model: {
        id: null,
        name: null
      }
    },
    city: {
      code: null,
      name: null
    },
    createDate: new Date().toISOString()
  };
  // requests.push(currentRequest);
  requestsList.push(currentRequest);
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
      id: req.body.model.id,
      name: req.body.model.name
    }
  };
  currentRequest.city = {
    code: req.body.city.code,
    name: req.body.city.name
  };
  res.send(currentRequest);
})

const changingStatus = () => {
  currentRequest.status.code = 'SUCCESS';
}

app.post('/reg_service/api/v1/request/registration', (req, res) => {
  const currentRequest = requestsList.find(item => item.id == req.body.id);
  currentRequest.status.code = 'PROCESSING';
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
      id: req.body.model.id,
      name: req.body.model.name
    }
  };
  currentRequest.city = {
    code: req.body.city.code,
    name: req.body.city.name
  };
  res.send(currentRequest);
  setTimeout(() => changingStatus(), 2000);
})