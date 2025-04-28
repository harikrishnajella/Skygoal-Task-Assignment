const bcrypt = require('bcryptjs');
const _ = require('lodash');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  const { name, email, password, role } = _.pick(req.body, ['name', 'email', 'password', 'role']);

  try {
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
    
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: 'User already exists' });
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword, role });
      res.status(201).json({message: "User registered successfully", user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = _.pick(req.body, ['email', 'password']);

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
    try {
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
};
  
  

module.exports = { register, login, logout };
