// const asyncMiddleware = require('../middleware/async');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {validate} = require('../models/specie');
const express = require('express');
const db = require('../startup/db');
const config = require('../startup/config');
const router = express.Router();

// router.get('/', asyncMiddleware(async (req, res) => {
router.get('/', auth, async (req, res) => {

  var param = [];
  let conn = db.conMySQL;
  console.log(req.user);
  conn.query('SELECT * FROM Species', function (err, rows, fields) {
    if(err) {
      return res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      return res.json(rows);
    }
  });
});
router.get('/:id', auth, async (req, res) => {

  let conn = db.conMySQL;

  var param = {species_name: req.params.id};
  console.log(param);

  conn.query('SELECT * FROM Species where ?', param, function (err, rows, fields) {
    if(err) {
      return res.status(501).send({"Error" : true, "Message" : "Error executing MySQL query"});
      } else if (rows.length == 0) {
      return res.status(404).send({"Error" : true, "Message" : "The species with the given ID was not found."});
    } else {
      return res.json(rows[0]);
    }
  });
});

router.post('/', auth, async (req, res) => {

  let conn = db.conMySQL;
  // console.log(req.body);

  const param = {species_name: req.body.species_name,capacity: req.body.capacity};
  // console.log(param);
  const { error } = validate(param); 
  if (error) return res.status(400).send(error.details[0].message);

  conn.query("insert into Species set ?", param, function(err,results,fields){
    if(err) {
      return res.status(501).send({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      return res.send(param);
    }
  });
});




module.exports = router;

