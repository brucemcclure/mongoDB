const mongoose = require('mongoose')

// Before is called one time before all tests are run
before(done => {
  // Using mongoose connect function to connect to local DB.  DBname = users_test
  mongoose.connect('mongodb://localhost/users_test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  // once + on are event handlers
  // once: wait for an event called open. Then run this function.
  // done() informs mocha that we are done
  // on: wait for an event called on. Then run this function.

  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', error => {
      console.warn('Warning', error)
    })
})

// Hook: A function that will be executed before running any file in test suite.
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done()
  })
})
