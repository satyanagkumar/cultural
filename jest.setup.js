// jest.setup.js
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const mongoose = require('mongoose');

beforeAll(async () => {
  const mongoURI = 'mongodb+srv://vineethketham:BpE7Yh74Fb76HF3h@cluster0.twnu23i.mongodb.net/'; // Update with your MongoDB connection URL
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});