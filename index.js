const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: 'Mousakka',
      level: 'Easy Peasy',
      ingredients: ['tomatoes', 'garlic', 'etc'],
      cuisine: 'Egyptian',
      dishType: 'Breakfast',
      duration: 60,
      creator: 'Haitham',
      created: new Date(1457, 11, 3)
    });
  })
  .then(recipe => {
    console.log('Recipe was created', recipe);
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    console.log('Inserted a bunch of recipes', recipes);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(riga => {
    console.log('Updated a recipe', riga);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(deleted => {
    console.log('deleted a recipe called ', deleted);
  })
  .then(() => {
    mongoose.connection.close();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
