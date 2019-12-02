const assert = require('assert')
const User = require('../src/user')

// Testing that validation works.
describe('validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined })
    // validateSync is a syncronous process.
    // validate only used during asyncronous
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name is required.')
  })

  it('requires a user name longer than 2 chars', done => {
    const user = new User({ name: 'pi' })
    // validateSync is a syncronous process.
    // validate only used during asyncronous
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name must be longer than 2 chars')
    done()
  })

  it('Disallows invalid records from being saved', done => {
    const user = new User({ name: 'pi' })
    user.save().catch(result => {
      const { message } = result.errors.name
      assert(message === 'Name must be longer than 2 chars')
      done()
    })
  })
})
