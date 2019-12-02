const assert = require('assert')
const User = require('../src/user')

// Done must be passed through and called for mongo to move onto the next func.
// Any call to the DB will take time and therefore will be async.

describe('Deleting a user', done => {
  let hamo

  beforeEach(done => {
    hamo = new User({ name: 'Hamo' })
    hamo.save().then(() => done())
  })

  // Model means hamo object. Class means User
  it('model instance remove', done => {
    // Find a user, then have a look for him, then make sure he is gone.
    hamo.deleteOne().then(() => User.findOne({ name: 'Hamo' })).then(user => {
      assert(user === null)
      done()
    })
  })

  it('class method remove', done => {
    // Remove a bunch of records with a given criteria
    User.deleteOne({ name: 'Hamo' })
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => {
        assert(user === null)
        done()
      })
  })

  it('class method findAndRemove', done => {
    User.findOneAndRemove({ name: 'Hamo' })
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndRemove', done => {
    // function only needs the id.
    User.findByIdAndRemove(hamo._id)
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => {
        assert(user === null)
        done()
      })
  })
})
