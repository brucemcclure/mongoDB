const mongoose = require('mongoose')
const Schema = mongoose.Schema

// A blog post will have many comments associated with it.
// Pass an array with a config object
// The type is pointing to a record sitting in a different collection
// ref = matched with a model definition. in this case Comment

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
})

// 1st arg is what the collection is called on the mongo side of things
// 2nd arg Check the user against the schema passed in
// User does not represent a single user but rather an entire collection of data

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

module.exports = BlogPost
