
// test that running the importer will only create
// new users if they aren't in the list already

const wrapper = require('../../functions/src/auth0-wrapper.js')(process.env.AUTH0_TOKEN, process.env.AUTH0_DOMAIN)

let user = {
    email: 'mail+testing@chrisadams.me.uk',
    firebaseId: 'bishboshbishbosh'
}

test('can create a user in one go', () => {
  expect.assertions(1);
  return wrapper.getOrCreateUser(user.email).then(newUser => {
    expect(newUser.email).toBe(user.email)
  })
})

test('it can make a user admin, based on email address', () => {
  expect.assertions(2);
  return wrapper.makeAdminUserByEmail(user.email).then(newUser => {
    expect(newUser.email).toBe(user.email)
    expect(newUser.app_metadata.admin).toBe(true)
  });
})

test("it can add a user's id from airable for firebase", () => {
  let userParams = { firebaseId: user.firebaseId }
  expect.assertions(2);
  return wrapper.addAirtableAPIToUserByEmail(user.email, userParams).then(newUser => {
    expect(newUser.email).toBe(user.email)
    expect(newUser.app_metadata.firebaseId).toBe(user.firebaseId)
  });
})

describe('fetching user records', () => {
  test('getUsers', () => {
    wrapper.getUsers().then(users => {
      users.forEach(u => {
        expect(u).toHaveProperty('email')
        expect(u).toHaveProperty('email_verified', true)
        // not every record has this, but should
        // expect(u).toHaveProperty('name')
        // expect(u).toHaveProperty('app_metadata.firebaseId')
      })
    })
  })
})
