const request= require('supertest');
const specie = require('../../models/specie');
const usera = require('../../models/usera');
const db = require('../../startup/db');

describe('/api/species', () => {
  let server;
  let conn;
  let token;
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

    token = usera.generateAuthToken({user_name: 'inge', id_admin: true});
  });
  afterEach(async () => {
    await server.close(); 
    await conn.query('delete from Species where species_name like "test%"',function(error,results,fields){}); 
  });
  describe('GET /', () => {
    it('should return all species', async () => {

      const res = await request(server).get('/api/species').set('x-auth-token', token);

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

      const res = await request(server).get('/api/species/test_rabrab1').set('x-auth-token', token);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('species_name', 'test_rabrab1');
    });

    it('should return 404 if invalid id is passed', async() => {
      const res = await request(server).get('/api/species/test_rabrab0').set('x-auth-token', token)

      expect(res.status).toBe(404);
    });
  });


  describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
      const res = await request(server)
        .post('/api/species')
        .send({species_name: 'inge'});
      expect(res.status).toBe(401);
    });

    it('should return 400 if genre is too long', async () => {

      const param = {species_name: 'test_rabrab4444444444444444444444444444444444444', capacity: 200};
      const res = await request(server)
        .post('/api/species')
        .set('x-auth-token', token)
        .send(param);
        expect(res.status).toBe(400);
    });

    it('should save the genre if it is valid', async () => {

      const param = {species_name: 'test_rabrab4', capacity: 200};
      const res = await request(server)
        .post('/api/species')
        .set('x-auth-token', token)
        .send(param);
      
      conn.query('SELECT * FROM Species where ?', {species_name: 'test_rabrab4'}, function (err, rows, fields) {
        let is_error = false;
        if(err) {
          is_error = true;
        }
        expect(is_error).toBe(false)
        expect(rows[0]).toMatchObject(param);
      });

    });

    // it('should return the genre if it is valid', async () => {
    //   // const token = new User().generateAuthToken();
    //   const token = (await User.findOne({ name: 'Tomio 2' }))
    //     .generateAuthToken();
    //   const res = await request(server)
    //     .post('/api/genres')
    //     .set('x-auth-token', token)
    //     .send({ name: 'genre1' });
      
    //   expect(res.body).toHaveProperty('_id');
    //   expect(res.body).toHaveProperty('name', 'genre1');
    //   expect(res.body).toMatchObject({ name: 'genre1' });

    // });
  });
});