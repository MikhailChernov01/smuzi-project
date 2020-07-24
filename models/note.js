const { Schema, model } = require('mongoose')

const notesSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  text: {
    type: String,
    uppercase: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('notes', notesSchema)
