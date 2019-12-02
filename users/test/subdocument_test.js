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
})
