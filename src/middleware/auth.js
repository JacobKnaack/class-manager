'use strict';

const User = require('../model/user');

module.exports = (capability) => {

  return function (request, response, next) {

    try {
      let [authType, authString] = request.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
        case 'basic':
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default:
          return _authError();
      }
    } catch {
      _authError();
    }

    function _authBasic(str) {
      let base64Buffer = Buffer.from(str, 'base64');
      let bufferString = base64Buffer.toString();
      let [email, password] = bufferString.split(':');
      let auth = {email, password};
      return User.authenticateBasic(auth)
        .then(user => _authenticate(user) )
        .catch(_authError);
    }

    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then( user => _authenticate(user) )
        .catch(_authError);
    }

    function _authenticate(user) {
      if(user) {
        request.user = user;
        request.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next({status: 401, message:'Invalid User ID/Password'});
    }
  }
};
