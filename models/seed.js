/* eslint-disable linebreak-style */
const Note = require('./note');
const faker = require('faker');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Ribozavr:PSZ9md1234@cluster0.at1bq.mongodb.net/Smuzi', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

async function createNotes() {
  for (let i = 0; i < 20; i++) {
    await Note.create({
      title: faker.company.companyName(),
      text: faker.lorem.paragraph()
    })
  }
  await mongoose.disconnect()
}

createNotes()
