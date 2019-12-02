const assert = require('assert')
const User = require('../src/user')

describe('subdocumets', () => {
  it('can create a sub document', done => {
    const hamo = new User({
      name: 'Hamo',
      posts: [{ title: 'posts title' }]
    })

    hamo.save().then(() => {
      User.findOne({ name: 'Hamo' }).then(user => {
        assert(user.posts[0].title === 'posts title')
        done()
      })
    })
  })

  // Promise chaining.
  // Create a user. Save. Update a user post. Save. Assert.

  it('can add sub documents to an existing record', done => {
    const hamo = new User({
      name: 'Hamo',
      posts: []
    })
    hamo
      .save()
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  //   it('can remove an existing sub document', done => {
  //     const hamo = new User({
  //       name: 'Hamo',
  //       posts: [{ title: 'New Post' }]
  //     })
  //     hamo
  //       .save()
  //       .then(() => User.findOne({ name: 'Hamo' }))
  //       .then(user => {
  //         const post = user.posts[0]
  //         post.remove()
  //         return user.save()
  //       })
  //       .then(() => User.findOne({ name: 'Hamo' }))
  //       .then(user => {
  //         assert(user.posts.length === 0)
  //       })
  //     done()
  //   })
  it('can remove an existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0]
        post.remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
