
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router
  .route('/api/notes')
  .get((req, res) => {
    Note.find((err, notes) => {
      res.json(notes);
    })
  })
  .post((req, res) => {
    res.send('Create nota');
  });

router
  .route('/api/note/:id')
  .get((req, res) => {
    res.send('Una nota por Id');
  })
  .put((req, res) => {
    res.send('Actualizar nota');
  })
  .delete((req, res) => {
    res.send('Borrar nota');
  });


module.exports = router;
