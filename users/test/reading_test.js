const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let hamo

  beforeEach(done => {
    // no let/var/cont because of scoping
    hamo = new User({ name: 'Hamo' })
    hamo.save().then(() => {
      done()
    })
  })

  it('Finding all users with a name of Joe', done => {
    User.find({ name: 'Hamo' }).then(users => {
      assert(users[0]._id.toString() === hamo._id.toString())
      done()
    })
  })

  it('Finds a user with a particular id', done => {
    User.findOne({ _id: hamo._id }).then(user => {
      assert(user.name === 'Hamo')
      done()
    })
  })
})
