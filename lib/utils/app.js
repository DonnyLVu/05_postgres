const express = require('express');
const Model = require('./models/model1.js');
const app = express();
app.use(express.json());

// CRUD STUFF HERE AKA POST GET UPDATE DELETE

// POST
app.post('/models', (req, res) => {
  Model
    .insert(req.body)
    .then(model1 => res.send(model1));
});

// FIND
app.get('/models', (req, res) => {
  Model
    .find()
    .then(model1 => res.send(model1));
});
app.get('/models/:id', (req, res) => {
  Model
    .findById(req.params.id)
    .then(model1 => res.send(model1));
});

// UPDATE
app.put('/models/:id', (req, res) => {
  Model
    .update(req.params.id, req.body)
    .then(model1 => res.send(model1));
});

// DELETE
app.delete('/models/:id', (req, res) => {
  Model
    .delete(req.params.id)
    .then(model1 => res.send(model1));
});

module.exports = app;
