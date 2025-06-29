const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exist = await User.findOne({ email, role });
    if (exist) return res.json({ status: 'error', error: 'Email with this role already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.json({ status: 'ok' });
  } catch (err) {
    console.error('Register error:', err);
    res.json({ status: 'error', error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.json({ status: 'error', error: 'Invalid email or role' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ status: 'error', error: 'Invalid password' });

    res.json({ status: 'ok', user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.json({ status: 'error', error: 'Login failed' });
  }
};