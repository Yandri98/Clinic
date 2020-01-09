const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://yandri:macias123@cluster0-cbevu.mongodb.net/test?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
  
})
  .then(db => console.log('Base de datos conectada con exito..'))
  .catch(err => console.error(err));
