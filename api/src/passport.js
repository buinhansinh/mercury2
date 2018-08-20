const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const query = require("./db/query");
const bcrypt = require("bcryptjs");
const db = require("./db/connection");
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new Strategy(async function(username, password, cb) {
    try {
      const user = await query(db).user.getByName(username);
      const passCorrect = bcrypt.compareSync(password, user.password);
      console.log(user.id);
      if (passCorrect) {
        user.permissions = await query(db).user.permissions(user.id);
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    } catch (e) {
      cb(e);
    }
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  return cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
  try {
    const user = await query.user.getById(id);
    user.permissions = await query.user.permissions(id);
    return cb(null, user);
  } catch (e) {
    return cb(null, e);
  }
});

module.exports = passport;
