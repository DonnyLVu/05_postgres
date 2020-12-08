require('dotenv').config();
const express = require('express');
// const request = require('supertest');
const Model = require('./lib/utils/models/model1.js');
const app = express();
app.use(express.json());

// CRUD STUFF HERE AKA POST GET UPDATE DELETE
// CREATE = POST, GET = Find, PUT = UPDATE, DELETE = DELETE

// POST
app.post('/model1', (req, res) => {
  Model
    .insert(req.body)
    .then(model1 => res.send(model1));
});
// FIND
app.get('/model1', (req, res) => {
  Model
    .find(req.body.id)
    .then(model1 => res.send(model1));
});
// UPDATE
app.put('/model1/:id', (req, res) => {
  Model
    .update(req.params.id, req.body)
    .then(model1 => res.send(model1));
});
// DELETE
app.delete('/model1/:id', (req, res) => {
  Model
    .delete(req.params.id)
    .then(model1 => res.send(model1));
});

module.export = {
  app
};

app.listen('3000', () => {
  console.log('Listening on port 3000');
});
