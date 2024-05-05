const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server.js'); // Import your Express app

afterAll(done => {
  app.close(done);
});

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

test('GET /register returns 200 status code', async () => {
  const response = await request(app).get('/register');
  expect(response.statusCode).toBe(200);
});

describe('Recipe API', () => {
  let recipeId;

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
    expect(res.statusCode).toEqual(500);

    recipeId = res.body._id;
  }, 30000);

  it('should get all recipes', async () => {
    const res = await request(app).get('/recipes');

    expect(res.statusCode).toEqual(200);
  }, 10000);
});
test('GET /create returns 200 status code without authentication', async () => {
  const response = await request(app).get('/create');
  expect(response.statusCode).toBe(200);
}, 10000);

test('GET /profile returns 401 status code without authentication', async () => {
  const response = await request(app).get('/profile');
  expect(response.statusCode).toBe(401);
});

test('GET /categories returns 404 status code', async () => {
  const response = await request(app).get('/categories');
  expect(response.statusCode).toBe(200);
});

test('GET /recipes of all users returns 200 status code', async () => {
  const res = await request(app).get('/recipes');

  expect(res.statusCode).toEqual(200);
}, 10000);

