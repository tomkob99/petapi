// const asyncMiddleware = require('../middleware/async');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const {validate} = require('../models/specie');
const express = require('express');
const db = require('../startup/db');
const router = express.Router();


// router.get('/', asyncMiddleware(async (req, res) => {
router.get('/', async (req, res) => {


  var param = [];
  console.log( db.conMySQL);
  let conn = db.conMySQL;
  conn.query('SELECT species_name FROM Species;', function (err, rows, fields) {
    if(err) {
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      // res.json({"Error" : false, "Message" : "Success", "Species" : fields});
      res.json(rows);
    }
  });
});





module.exports = router;

