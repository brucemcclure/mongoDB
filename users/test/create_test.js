const assert = require('assert')
const User = require('../src/user')

describe('Creating users', () => {
  it('Saves a user', done => {
    const hamo = new User({ name: 'Hamo' })
    hamo.save().then(() => {
      assert(!hamo.isNew)
      done()
    })
  })
})
