const assert = require('assert')
const User = require('../src/user')

describe('updating users records', done => {
  let hamo

  beforeEach(done => {
    // no let/var/cont because it is already 'let'ed
    hamo = new User({ name: 'Hamo', postCount: 0 })
    hamo.save().then(() => done())
  })

  let assertName = (opperation, done) => {
    opperation.then(() => User.find({})).then(users => {
      assert(users.length === 1)
      assert(users[0].name === 'Pickle')
      done()
    })
  }

  // .set({}) updates a record .save() must still be called so it can persist
  // Use case will be to update small bits of information over time

  it('instance type using set and save', done => {
    hamo.set({ name: 'Pickle' })
    assertName(hamo.save(), done)
  })

  // Use case will be to update the record once and then be finished with it

  it('A model instance can update', done => {
    assertName(User.update({ name: 'Hamo' }, { name: 'Pickle' }), done)
  })

  // used when we need to update a unique record
  it('A model class can update one record', done => {
    assertName(
      User.findOneAndUpdate({ name: 'Hamo' }, { name: 'Pickle' }),
      done
    )
  })

  // used when we need to update a unique record based on a users _id
  it('A model instance can find a record with an id and update', done => {
    User.findByIdAndUpdate(hamo._id, { name: 'Pickle' }, done)
  })

  // This is an example of using the Update Operators from Mongo
  it('a user can have their post count incrimented by 1', done => {
    User.update({ name: 'Hamo' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Hamo' }))
      .then(user => assert(user.postCount === 1))
    done()
  })
})
