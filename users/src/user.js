const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  postCount: Number
})

// 1st arg is what the collection is called on the mongo side of things
// 2nd arg Check the user against the schema passed in
// User does not represent a single user but rather an entire collection of data

const User = mongoose.model('user', userSchema)

module.exports = User