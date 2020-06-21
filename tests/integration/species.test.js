const request= require('supertest');
const {Genre} = require('../../models/specie');
const {User} = require('../../models/user');
const db = require('../../startup/db');

describe('/api/species', () => {
  let server;
  let conn;
  beforeAll(() => {
    conn = db.conMySQL;
  });
  beforeEach(async () => { 
    server = require('../../index');
    let rab = {species_name:'test_rabrab1',capacity:1};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});
    rab = {species_name:'test_rabrab2',capacity:2};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});
    rab = {species_name:'test_rabrab3',capacity:3};
    await conn.query("insert into Species set ?",rab,function(error,results,fields){});  
  });
  afterEach(async () => {
    await server.close(); 
    await conn.query('delete from Species where species_name like "test%"',function(error,results,fields){}); 
  });
  describe('GET /', () => {
    it('should return all species', async () => {
      const res = await request(server).get('/api/species');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(6);
      // console.log(res.body);
      expect(res.body.some(g => g.species_name === 'test_rabrab1' && g.capacity === 1)).toBeTruthy();
      expect(res.body.some(g => g.species_name === 'test_rabrab2' && g.capacity === 2)).toBeTruthy();
      expect(res.body.some(g => g.species_name === 'test_rabrab3' && g.capacity === 3)).toBeTruthy();
    });
  });
  describe('GET /:id', () => {
    it('should return a genre if valid id is passed', async () => {

      const res = await request(server).get('/api/species/test_rabrab1');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('species_name', 'test_rabrab1');
    });

    it('should return 404 if invalid id is passed', async() => {
      const res = await request(server).get('/api/species/test_rabrab0')

      expect(res.status).toBe(404);
    });
  });
});