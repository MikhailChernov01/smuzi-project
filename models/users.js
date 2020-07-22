const { Schema, model } = require('mongoose');

const schemaUsers = new Schema({
  username: {
    type: String,
    unique: true,
    required: [
      () => {
        this.username.length > 1 && this.username.length <= 15;
      },
      'failed username ',
    ],
  },
  email: {
    type: String,
    unique: true,
    required: [
      () => {
        /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/gi.test(this.email);
      },
      'failed email ',
    ],
  },
  password: { type: String, required: true },
  purchases: Array,
  counts: this.purchases.length,
});

module.exports = model('Users', schemaUsers);
