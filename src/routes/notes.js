const express = require('express');
const router = express.Router();


// Models
const Note = require('../models/Note');

//controllers
const image = require('../controller/image');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// Agregar nueva nota
router.get('/notes/add', isAuthenticated, (req, res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
  const { nombres, apellidos, direccion, numero, edad, cedula, estatura, diagnostico } = req.body;
  const errors = [];
  if (!nombres) {
    errors.push({text: 'Escribe un nombre.'});
  }
  if (!apellidos) {
    errors.push({text: 'Escribe una descripcion'});
  }
  if (!direccion) {
    errors.push({text: 'Escribe una dirección'});
  }
  if (!numero) {
    errors.push({text: 'Escribe un numero'});
  } 
  if (!edad) {
    errors.push({text: 'Escribe la edad'});
  } 
  if (!cedula) {
    errors.push({text: 'Escribir la cedula'});
  }
  if (!estatura) {
    errors.push({text: 'Escribir la estatura'});
  }
  if (!diagnostico) {
    errors.push({text: 'Escribir el diagnostico'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      nombres,
      apellidos,
      direccion,
      numero,
      edad,
      cedula,
      estatura,
      diagnostico
    });
  } else {
    const newNote = new Note({nombres, apellidos, direccion, numero,edad, cedula, estatura, diagnostico});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Datos agregados correctamente');
    res.redirect('/notes');
  }
});

// Metodo obtener datos de usuarios (Get)
router.get('/notes', isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).sort({date: 'desc'});
  res.render('notes/all-notes', { notes });
});

// Editar Usuarios
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  if(note.user != req.user.id) {
    req.flash('error_msg', 'No autorizado');
    return res.redirect('/notes');
  } 
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
  const { nombres, apellidos, numero, direccion, edad, cedula, estatura, diagnostico } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {nombres, apellidos, numero, direccion, edad, cedula, estatura, diagnostico});
  req.flash( 'success_msg', 'Datos actualizados correctamente' );
  res.redirect('/notes');
});

// Delete Notes
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Datos borrados correctamente');
  res.redirect('/notes');
});


//router.get('/', home.index);
router.get('/images/:image_id', image.index);
router.post('/images', image.create);
router.post('/images/:image_id/like', image.like);
router.post('/images/:image_id/comment', image.comment);
router.delete('/images/:image_id', image.remove);


module.exports = router;
