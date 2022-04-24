const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  real_name: {
    type: String,
    required: true
  },
  origin_description: {
    type: String,
    required: true
  },
  superpowers: {
    type: String,
    required: true
  },
  catch_phrase: {
    type: String,
    required: true
  },
  images: [{
    filename: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    imageBase64: {
      type: String,
      required: true
    }
  }]
})

const Hero = mongoose.model('Hero', heroSchema)

module.exports = Hero