const ManagementClient = require('auth0').ManagementClient;
const AuthenticationClient = require('auth0').AuthenticationClient;

 // you get an auth0 token from
 // https://manage.auth0.com/#/apis/management/explorer

exports.admin = function () {

  // TODO this is such a pain
  // I've cheated by using the explorer at the link below to create a longer
  // lasting token, to access the API for tests. Really, we should automate
  // the process but it'll take a while to grok the new process:
  // https://auth0.com/docs/api/management/v2/tokens#automate-the-process

  // https://manage.auth0.com/#/apis/management/explorer

  // let authclient = new AuthenticationClient({
  //   domain: process.env.AUTH0_DOMAIN,
  //   clientId: process.env.AUTH0_API_EXPLORER_CLIENT_ID,
  //   clientSecret: process.env.AUTH0_API_EXPLORER_CLIENT_SECRET
  // })
  //
  // let scopes = "read:client_grants create:client_grants delete:client_grants update:client_grants read:users update:users delete:users create:users read:users_app_metadata update:users_app_metadata delete:users_app_metadata create:users_app_metadata"
  //
  // return authclient.clientCredentialsGrant({
  //   audience: process.env.AUTH0_AUTH_TOKEN_AUDIENCE,
  //   scope: scopes
  // })
  // .then(response => {
  //   console.log(response)
  //   return response
  // })
  // .catch(error => {
  //   console.log(error)
  // })
  // .then(response =>{
    return new ManagementClient({
      token: process.env.AUTH0_TOKEN,
      domain: process.env.AUTH0_DOMAIN
    })
  // })
}

exports.getOrCreateUser = function (userEmail, auth0) {
  // this hides the email checking, so we don't spam people
  // with the invite
  let user = {
    "connection": "email",
    "email": userEmail,
    "email_verified": true,
    "verify_email": false,
  }
  return auth0.createUser(user)
    .then(newUser => {
      console.log('auth0 user', newUser.email)
      return newUser
    })
}

exports.makeAdminUserByEmail = function(emailAddress, auth0) {
  return auth0.getUsersByEmail(emailAddress)
    .then(function (users) {
      console.log(users)
      return (users)
    })
    .then(function (users) {
      let uid = users[0].user_id
      let params = { admin: true }
      return updateUser(uid, params, auth0)
    })
}

exports.addAirtableAPIToUserByEmail = function(emailAddress, params, auth0) {
  return auth0.getUsersByEmail(emailAddress)
    .then(function (users) {
      console.log(users)
      return (users)
    })
    .then(function (users) {
      let uid = users[0].user_id      
      return updateUser(uid, params, auth0)
    })
}

function updateUser(uid, params, auth0) {
  return auth0.updateAppMetadata({id: uid}, params)
    .then(function (user) {
      console.log('user updated')
      console.log(user)
      return user
    })
}