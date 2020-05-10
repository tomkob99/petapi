const {Genre} = require('../../../models/genre');
const config = require('config');
const mongoose = require('mongoose');

describe('Genres', () => {
  it('should return genres', async () => {

    const db = config.get('db');
    mongoose.connect(db)
    .then(() => console.log(`Connected to ${db}...`));

    const genres = await Genre.find().sort('name');

    expect(genres[0].name).toBe('Action');
  });
});