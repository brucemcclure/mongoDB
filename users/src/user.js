const mongoose = require('mongoose')
const PostSchema = require('./post')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 chars'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema]
})

// Creates a virtual type on users
// .get() used because we are using getters/setters in es6.
// Therefore when we go hamo.postCount it will run the function assigned
// function() instead of =()=>
// Becasue 'this' will refer to the instance of the model that we are working on
// A fat arrow function will give "this" the meaning of the whole file

userSchema.virtual('postCount').get(function () {
  return this.posts.length
})

// 1st arg is what the collection is called on the mongo side of things
// 2nd arg Check the user against the schema passed in
// User does not represent a single user but rather an entire collection of data

const User = mongoose.model('user', userSchema)

module.exports = User
