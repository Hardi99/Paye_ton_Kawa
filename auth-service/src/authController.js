const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Invalid username or password' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header('Authorization', token).json({ message: 'Logged in successfully', token });
};
