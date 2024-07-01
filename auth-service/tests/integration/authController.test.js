// authController.test.js

const request = require('supertest');
const app = require('../../src/server');
const User = require('../../src/User');
const mongoose = require('mongoose');
require('dotenv').config()

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login a user', async () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    await new User(userData).save();

    const res = await request(app)
      .post('/api/auth/login')
      .send(userData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Logged in successfully');
    expect(res.body).toHaveProperty('token');
  });
});
