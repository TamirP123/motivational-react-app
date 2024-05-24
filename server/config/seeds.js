const db = require('./connection');
const { User, Post, Category } = require('../models');

db.once('open', async () => {

  const categories = await Category.insertMany([
    { name: 'Prayer' },
    { name: 'Motivational' },
    { name: 'Social' }
  ]);

  console.log('categories seeded');

  process.exit();
});
