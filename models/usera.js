const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

function generateAuthToken(payload) {
  return jwt.sign(payload, config.get('jwtPrivateKey'));
}


function validate(user) {
  const schema = {
    user_name: Joi.string().max(50).required(),
    password: Joi.string().max(50).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(50).required(),
    first_work_date: Joi.date().required(),
    email: Joi.string().max(50).required(),
    salt: Joi.string().max(100).required()
  };

  return Joi.validate(user, schema);
}

exports.validate = validate;
exports.generateAuthToken = generateAuthToken;