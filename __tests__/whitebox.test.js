const JWT_SECRET = process.env.JWT_SECRET || '#%YRWR#F#';
const { authenticateToken, generateValidToken } = require('../controllers/authController');
const Category = require('../models/category.js');
const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('../server.js'); // Import your Express app

jest.setTimeout(10000);

test('authenticateToken function returns false for invalid token', () => {
    const result = authenticateToken('662c3fdd1dsga34e2a9be1213f');
    expect(result).toBe(false);
  });
  
  test('authenticateToken function returns true for valid token', () => {
    const validToken = generateValidToken('662c3fdd1ea34e2a9be1213f');
    const result = authenticateToken(validToken);
    expect(result).toBe(true);
  });
  
  test('Category model has correct schema', () => {
    const keys = Object.keys(Category.schema.paths);
    const expectedKeys = ['name', 'description', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
  });
  
  test('Recipe model has correct schema', () => {
    const keys = Object.keys(Recipe.schema.paths);
    const expectedKeys = ['title', 'description', 'ingredients', 'instructions', 'servingSize', 'preparationTime', 'category', 'createdBy', 'image', 'createdAt', 'comments', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
  });
  
  test('User model has correct schema', () => {
    const keys = Object.keys(User.schema.paths);
    const expectedKeys = ['username', 'email', 'password', 'createdAt', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
  });
  test('bcrypt hashes password correctly', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hash);
    expect(match).toBe(true);
  });
  
  test('bcrypt does not match incorrect password', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare('incorrect_password', hash);
    expect(match).toBe(false);
  });