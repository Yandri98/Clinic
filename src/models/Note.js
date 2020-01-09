const mongoose = require('mongoose');
const { Schema } = mongoose;



const NoteSchema = new Schema({
 
  nombres: {
    type: String,
    required: true

  },
  apellidos: {
    type: String,
    required: true
  },
  direccion: {
  type: String,
  required: true
  },
  numero: {
  type: Number,
  required: true
  },
  edad: {
 type: Number,
 required: true
  },
  cedula: {
type: Number,
required: true
  },
  estatura: {
type: Number,
require: true
  },
diagnostico:{
  type: String,
  required: true
},

  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }


});

module.exports = mongoose.model('Note', NoteSchema);
