const mongoose = require('mongoose')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('associations', () => {
  let hamo, blogPost, comment
  // WE need to create instances of the models
  beforeEach(done => {
    hamo = new User({ name: 'Hamo' })
    blogPost = new BlogPost({
      title: 'JS Funk is tricky',
      content: 'Yes it really is'
    })
    comment = new Comment({ content: 'This is a good post' })

    // To make the association we simply push a blogpost onto a user
    // Magic on mongooses side. We dont actually push the whole model
    // Mongoose just sets up the ID
    hamo.blogPosts.push(blogPost)
    blogPost.comment.push(comment)
    // Some more mongoose magic
    // Gives hamos ref to the prop
    comment.author = hamo

    Promise.all([hamo.save(), blogPost.save(), comment.save()]).then(() => {
      done()
    })
  })
})
