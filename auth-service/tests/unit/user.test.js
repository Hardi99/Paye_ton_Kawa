// user.test.js

const User = require('../../src/User');
const mongoose = require('mongoose');
require('dotenv').config()

describe('User Model', () => {
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

  it('should save a user', async () => {
    const userData = { username: 'testuser', password: 'testpassword' };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser).toHaveProperty('_id');
    expect(savedUser).toHaveProperty('username', 'testuser');
    expect(savedUser).toHaveProperty('password'); // Le mot de passe doit être haché
  });
});
