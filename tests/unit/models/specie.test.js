const config = require('config');
const mysql = require("mysql");
//const {conn} = require("../../../startup/db");
const {validate} = require('../../../models/specie');
//const db = require('../../../startup/db');

describe('Species', () => {
   let conn;
  beforeAll(async () => {
    const msdb_server = config.get('msdb_server');
    const msdb_database = config.get('msdb_database');
    const msdb_user = config.get('msdb_user');
    const msdb_password = config.get('msdb_password');
    conn = mysql.createConnection({
      host : msdb_server,
      user : msdb_user,
      password : msdb_password,
      database: msdb_database
    });

    // 接続
    conn.connect(); 

    // db.connect();
    // conn = db.conMySQL;
  });
  beforeEach(async () => {
    let rab = {species_name:'test_rabrab1',capacity:1};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});
    rab = {species_name:'test_rabrab2',capacity:2};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});
    rab = {species_name:'test_rabrab3',capacity:3};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});
  });
  afterEach(async () => {
    await conn.query('delete from Species where species_name like "test%"',function(error,results,fields){}); 
  });

  it('should return species', async () => {

    var param = [];
    conn.query('SELECT species_name FROM Species;', function (err, rows, fields) {
      if (err) { 
        console.log('err: ' + err);
        return;
      }
      expect(rows[0].species_name).toBe('Cat');
    });
  });
  it('should insert species', async () => {

    const rab = {species_name:'test_rabrab100',capacity:15};
    const { error } = validate(rab);
    expect(error).toBe(null);
    await conn.query("insert into Species set ?",rab,function(error,results,fields){
      expect(results.affectedRows).toBe(1);
    });
  });
  it('should update species', async () => {
    const cap = {capacity:2000};
    const spe = {species_name:'test_rabrab1'};

    await conn.query("update Species set ? where ?",[cap,spe], function(error,results,fields){
      expect(results.affectedRows).toBe(1);
    });
  });
  it('should delete species', async () => {
    const spe = {species_name:'test_rabrab1'};

    await conn.query("delete from Species where ?",spe, function(error,results,fields){
      expect(results.affectedRows).toBe(1);
    });
  });
});



