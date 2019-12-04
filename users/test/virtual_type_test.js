const assert = require('assert')
const User = require('../src/user')

// NB have a look at seeting up the virtual field in user.js

describe('Virtual types', () => {
  it('postCount returns number of posts', done => {
    const hamo = new User({ name: 'Hamo', posts: [{ title: 'Pickles' }] })
    hamo
      .save()
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => assert(user.postCount === 1))
    done()
  })
})
