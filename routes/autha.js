const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const usera = require('../models/usera');
const express = require('express');
const router = express.Router();
const db = require('../startup/db');


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let password = '';
  let conn = db.conMySQL;
  conn.query('SELECT password FROM User where user_name = ?', [req.body.user_name], function (err, rows, fields) {
    if(err) {
      return res.status(501).send({"Error" : true, "Message" : "Error executing MySQL query"});
      } else if (rows.length == 0) {
      return res.status(400).send('invalid user or password');
    } else {
      password = rows[0].password;
      // console.log('rows[0].password=', rows[0].password);

      console.log('req.body.password=', req.body.password);
      console.log('password=', password);
      //const validPassword = await bcrypt.compare(req.body.password, user.password);
      const validPassword = (req.body.password === password);
      
      console.log('user.validPassword=', validPassword);
      if (!validPassword) return res.status(400).send('invalid user or password');

      conn.query('SELECT user_name FROM Admin where user_name = ?', [req.body.user_name], function (err, rows, fields) {
        let is_admin = false;
        if (rows.length == 1) is_admin = true;
        const payload = {user_name: req.body.user_name, id_admin: is_admin};
        const token = usera.generateAuthToken(payload);  

        return res.header('x-auth-token', token).send(token);
        // return res.status(200).send('hello');
      });
    }
  });


});


function validate(req) {
  const schema = {
    user_name: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;