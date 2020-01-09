const router = require('express').Router();
const passport = require('passport');

// Models
const User = require('../models/User');

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  let errors = [];
  const { name, cedula, email, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if(password.length < 4) {
    errors.push({text: 'Las contraseñas deben tener más de 4 caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/signup', {errors, name, cedula, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const cedulaUser = await User.findOne({cedula: cedula});
    const emailUser = await User.findOne({email: email});
    if(cedulaUser) {
      req.flash('error_msg', 'El usuario ya esta en uso.');
      res.redirect('/users/signup');
      
    }  if(emailUser) {
      req.flash('error_msg', 'El Correo ya esta en Uso.');
      res.redirect('/users/signup');
      
    } else {
      // Saving a New User
      const newUser = new User({name, cedula, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Usuario registrado.');
      res.redirect('/users/signin');
    }
  }
});

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Has cerrado sesion.');
  res.redirect('/users/signin');
});

module.exports = router;
