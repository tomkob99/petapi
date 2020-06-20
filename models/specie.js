const Joi = require('joi');
// const Sequelize = require('sequelize').Sequelize;

// const host     = '192.168.0.36';
// const database = 'animalhaven';
// const username = 'tomio';
// const password = '98819881';

// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: 'mysql',
//   operatorsAliases: false,
//   pool: {
//     min: 0,
//     max: 5,
//     acuire: 30000,
//     idle  : 10000
//   }
// });

// const Species = sequelize.define('Species', {                                                                // CREATE TABLE 文で指定した内容は大体以下のような感じ
//   species_name : { 
//     field: 'species_name', 
//     type: Sequelize.STRING(20)
//   },
//   capacity : { 
//     field: 'capacity', 
//     type: Sequelize.INTEGER(5)
//   },
// });

function validateSpecies(species) {
  const schema = {
    species_name: Joi.string().max(20).required(),
    capacity: Joi.number().max(99999).required()
  };

  return Joi.validate(species, schema);
}

// exports.Species = Species; 
exports.validate = validateSpecies;