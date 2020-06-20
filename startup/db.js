
const config = require('config');
const mongoose = require('mongoose');
const { logger } = require('../middleware/error');
const mysql = require("mysql");

// mongoose.connect('mongodb://192.168.0.36:27017/vidly')

// let conMySQL = 'Hello';

  
console.log('Before connect MySQL');

const msdb_server = config.get('msdb_server');
const msdb_database = config.get('msdb_database');
const msdb_user = config.get('msdb_user');
const msdb_password = config.get('msdb_password');
const conMySQL = mysql.createConnection({
  host : msdb_server,
  user : msdb_user,
  password : msdb_password,
  database: msdb_database
});

// 接続
conMySQL.connect();

console.log('After connect MySQL');

/* module.exports = function() {
  const db = config.get('db');
  console.log('Before connect');
  mongoose.connect(db)
  .then(() => logger.info(`Connected to ${db}...`));
  console.log('After connect');
} */

function connect() {
  const db = config.get('db');
  console.log('Before connect Mongo');
  mongoose.connect(db)
  .then(() => logger.info(`Connected to ${db}...`));
  console.log('After connect Mongo');

}

exports.connect = connect;
exports.conMySQL = conMySQL; 