// Importing necessary modules and setting up environment variables
const JWT_SECRET = process.env.JWT_SECRET || '#%YRWR#F#';
const { authenticateToken, generateValidToken } = require('../controllers/authController');
const Category = require('../models/category.js');
const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// Polyfill for TextEncoder and TextDecoder for global usage
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Importing Express app for testing
const request = require('supertest');
const app = require('../server.js');

// Setting timeout for Jest tests
jest.setTimeout(10000);

// Test to verify if authenticateToken function returns false for invalid token
test('authenticateToken function returns false for invalid token', () => {
    const result = authenticateToken('662c3fdd1dsga34e2a9be1213f');
    expect(result).toBe(false);
});

// Test to verify if authenticateToken function returns true for valid token
test('authenticateToken function returns true for valid token', () => {
    const validToken = generateValidToken('662c3fdd1ea34e2a9be1213f');
    const result = authenticateToken(validToken);
    expect(result).toBe(true);
});

// Test to verify if Category model has correct schema
test('Category model has correct schema', () => {
    const keys = Object.keys(Category.schema.paths);
    const expectedKeys = ['name', 'description', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
});

// Test to verify if Recipe model has correct schema
test('Recipe model has correct schema', () => {
    const keys = Object.keys(Recipe.schema.paths);
    const expectedKeys = ['title', 'description', 'ingredients', 'instructions', 'servingSize', 'preparationTime', 'category', 'createdBy', 'image', 'createdAt', 'comments', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
});

// Test to verify if User model has correct schema
test('User model has correct schema', () => {
    const keys = Object.keys(User.schema.paths);
    const expectedKeys = ['username', 'email', 'password', 'createdAt', '_id', '__v']; // Update with your actual schema
    expect(keys).toEqual(expect.arrayContaining(expectedKeys));
});

// Test to verify if bcrypt hashes password correctly
test('bcrypt hashes password correctly', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hash);
    expect(match).toBe(true);
});

// Test to verify if bcrypt does not match incorrect password
test('bcrypt does not match incorrect password', async () => {
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare('incorrect_password', hash);
    expect(match).toBe(false);
});
