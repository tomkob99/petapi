const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
// const {User, validate} = require('../models/user');
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const db = require('../startup/db');

router.get('/me', auth, async (req, res) => {

  let conn = db.conMySQL;

  var param = {user_name: req.user.user_name};
  console.log(param);

  conn.query('SELECT * FROM User where ?', param, function (err, rows, fields) {
    if(err) {
      return res.status(501).send({"Error" : true, "Message" : "Error executing MySQL query"});
      } else if (rows.length == 0) {
      return res.status(404).send({"Error" : true, "Message" : "The species with the given ID was not found."});
    } else {
      return res.json(rows[0]);
    }
  });
});

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered')

//   // user = new User ({
//   //   name: req.body.name,
//   //   email: req.body.email,
//   //   password: req.body.password
//   // })
//   user = new User (_.pick(req.body, ['name', 'email', 'password']));

//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);

//   await user.save();

//   // res.send(user);
//   // res.send(_.pick(user, ['_id', 'name', 'email']));
//   // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
//   const token = user.generateAuthToken();
//   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
// });


module.exports = router;