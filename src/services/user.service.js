const jwt = require('jsonwebtoken');
const { User } = require('../models');

const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const login = async ({ email, password }) => {
    try {
        const result = await User.findOne({
          where: { email, password },
        });
    
        if (!result) return { type: 400, message: 'Invalid fields' };
    
        const jwtConfig = {
          expiresIn: '1d',
          algorithm: 'HS256',
        };

        const user = await findUserByEmail(email);
    
        const token = jwt.sign({ user }, process.env.JWT_SECRET, jwtConfig);
    
        return { type: null, message: token };
      } catch (error) {
        return { type: 500, message: 'Something went wrong' };
      }
};

const createUser = async (body) => {
  try {
    const [, add] = await User.findOrCreate({
      where: { email: body.email },
      defaults: body,
    });
    if (!add) return { type: 409, message: 'User already registered' };
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const { email, displayName, image } = body;
    const token = jwt
    .sign({ email, displayName, image }, process.env.JWT_SECRET, jwtConfig);

    if (add) return { type: null, message: token };  
  } catch (error) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const getAll = async () => {
  try {
    const message = await User.findAll({ attributes: { exclude: ['password'] } });
    return { type: null, message };
  } catch (error) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const getUserById = async (id) => {
  try {
    const message = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!message) return { type: 404, message: 'User does not exist' };
    return { type: null, message };
  } catch (error) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const deleteById = async ({ userId }) => {
  const result = await User.destroy({ where: { id: userId } });
  return result;
};

module.exports = {
  login,
  createUser,
  getAll,
  getUserById,
  findUserByEmail,
  deleteById,
};