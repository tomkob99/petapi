const Joi = require('joi');

function validateSpecies(species) {
  const schema = {
    species_name: Joi.string().max(20).required(),
    capacity: Joi.number().max(99999).required()
  };

  return Joi.validate(species, schema);
}

// exports.Species = Species; 
exports.validate = validateSpecies;