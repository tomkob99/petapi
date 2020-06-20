// // const config = require('config');
// // // const mysql = require("mysql");

// const Sequelize = require('sequelize');
// // const mysql2 = require('mysql2');
// // // const {Species, validate} = require('../../../models/species');



// describe('Species2', () => {
//   it('should insert into species', async () => {
//     import iconv from "iconv-lite";
//     import encodings from "iconv-lite/encodings";
//     iconv.encodings = encodings;

//       console.log('hello');
// //     // Species.create({
// //     //   species_name: 'Rabbit',
// //     //   capacity : '15'
// //     // })
// //     //   .then((result) => {
// //     //   });

//     const sequelize = new Sequelize('animalhaven','tomio','98819881',{
//       host: '192.168.0.36', 
//       dialect:'mysql'
//     });
//     sequelize.query("select * from species").spread((results, metadata) => {
//       console.log(results);
//       sequelize.close();
//     })
//   });
// });



