const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === "admin") return res.status(404).json({ message: 'The User is an Admin. You cannot delete Admin' });
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllUsers, deleteUser };
