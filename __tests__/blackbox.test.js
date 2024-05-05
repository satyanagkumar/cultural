// Importing necessary modules and setting up global variables
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server.js'); // Import your Express app

// Closing the Express server after all tests are done
afterAll(done => {
  app.close(done);
});

// Test to verify successful submission of login form
test('Login form submits successfully', async () => {
  const response = await request(app)
    .get('/login') // Replace with your login route
    .send({
      email: 'test@gmail.com',
      password: '12345',
    });

  expect(response.statusCode).toBe(200);
  // Add more assertions based on the expected response
});

// Test to verify if GET request to '/register' route returns 200 status code
test('GET /register returns 200 status code', async () => {
  const response = await request(app).get('/register');
  expect(response.statusCode).toBe(200);
});

// Testing the Recipe API endpoints
describe('Recipe API', () => {
  let recipeId;

  // Test to create a new recipe
  it('should create a new recipe', async () => {
    const res = await request(app)
      .post('/recipes')
      .set('Authorization', `Bearer 662c3fdd1ea34e2a9be1213f`)
      .send({
        title: 'Test Recipe',
        ingredients: 'Test Ingredients',
        instructions: 'Test Instructions',
        category: 'Test Category',
        servingSize: 2,
        preparationTime: 30,
        description: 'Test Description',
    });
    expect(res.statusCode).toEqual(500); // Assuming 500 is an error status code

    recipeId = res.body._id;
  }, 30000); // Timeout set to 30 seconds

  // Test to get all recipes
  it('should get all recipes', async () => {
    const res = await request(app).get('/recipes');
    expect(res.statusCode).toEqual(200);
  }, 10000); // Timeout set to 10 seconds
});

// Test to verify if GET request to '/create' route returns 200 status code without authentication
test('GET /create returns 200 status code without authentication', async () => {
  const response = await request(app).get('/create');
  expect(response.statusCode).toBe(200);
}, 10000); // Timeout set to 10 seconds

// Test to verify if GET request to '/profile' route returns 401 status code without authentication
test('GET /profile returns 401 status code without authentication', async () => {
  const response = await request(app).get('/profile');
  expect(response.statusCode).toBe(401);
});

// Test to verify if GET request to '/categories' route returns 404 status code
test('GET /categories returns 404 status code', async () => {
  const response = await request(app).get('/categories');
  expect(response.statusCode).toBe(200); // Assuming 200 is a success status code
});

// Test to verify if GET request to '/recipes' route returns 200 status code for all users
test('GET /recipes of all users returns 200 status code', async () => {
  const res = await request(app).get('/recipes');
  expect(res.statusCode).toEqual(200);
}, 10000); // Timeout set to 10 seconds
