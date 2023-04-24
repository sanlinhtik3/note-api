const expressAsyncHandler = require("express-async-handler");
const userModels = require("../models/user.models");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Get all user
// /api/user/
// @Private
const getUsers = expressAsyncHandler(async (req, res) => {
  const users = await userModels.find();
  return res.status(200).json(users);
});

// Create user
// /api/user/create
// @Private
const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(401);
    throw new Error("Please all fill your data...");
  }

  const userExists = await userModels.findOne({email})
  if(userExists) {
    res.status(401);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  const user = await userModels.create({
    name,
    email,
    password: hashPassword
  });

  if(user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
  }

});

// Create user
// /api/user/create
// @Private
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("Please all fill your data...");
  }

  const user = await userModels.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
  } else {
    res.status(400)
    throw new Error('User doest not match')
  }

});

// Create user
// /api/user/create
// @Private
const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    throw new Error("user ID not found");
  }

  const user = await userModels.findByIdAndUpdate(id, req.body, { new: true });

  return res.status(200).json(user);
});

// Create user
// /api/user/create
// @Private
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    throw new Error("user ID not found");
  }

  const user = await userModels.findById(id)

  await user.deleteOne()

  return res.status(200).json(user);
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWTTOKEN, {
        expiresIn: '30d'
    })
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
