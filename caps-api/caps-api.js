'use strict';

const io = require('socket.io-client');
const express = require('express');
const cors = require('cors');
const faker = require('faker');

// const Queue = require('./lib/queue');

// const queue = new Queue('api');

const socket = io.connect('http://localhost:3000/caps')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const PORT = process.env.PORT || 3001;


app.post('/pickup', (req, res) => {

  const hasBody = Object.keys(req.body).length;

  let defaultStore = req.body || {
    store: '1-206-flowers',
    orderID: faker.random.uuid(),
    customer: req.body.customer,
    address: req.body.address,
  };

  console.log(req.body);
  let time = new Date();
  const delivery = { event: 'pickup', time: time, payload: hasBody ? req.body : defaultStore};

  socket.emit('pickup', delivery);
  res.status(200).send('scheduled');

});

app.listen(PORT, console.log(`listening on ${PORT}`));