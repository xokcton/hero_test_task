require('dotenv').config()
const mongoose = require('mongoose')

const { MONGODB_URI } = process.env

const Connect = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`Successfully connected to the MongoDb Atlas: ${connection.connection.host}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = Connect