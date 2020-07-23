const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const schemaUsers = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  superUser: {
    type: Boolean,
    default: false,
    },
  password: { type: String, required: true },
  purchases: {
    type: Array,
    default: [],
  },
  
});
const User = model('Users', schemaUsers);
module.exports = User;








