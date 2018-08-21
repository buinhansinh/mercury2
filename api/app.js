const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("./src/passport");
const api_init = require("./src/init");
const api_route = require("./src/route");
const session = require('express-session')

api_init();

const app = express();
app.use(
  session({
    secret: 'test-secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(logger('dev'));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: 'false' }));

=======
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(
  session({
    secret: "test-secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
>>>>>>> mercury2/master
// Authentication via passport.js
app.use(passport.initialize());
app.use(passport.session());

// Login and logout
app.post(
  '/login',
  passport.authenticate('local', { failWithError: false }),
  function(req, res) {
    return res.json({
      user: req.user
    });
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.json();
});

// Some stuff for including angular
// app.use(express.static(path.join(__dirname, 'dist')));
// app.use('/api', express.static(path.join(__dirname, 'dist')));
app.use(
  '/api',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      const err = new Error('Unauthorized');
      err.status = 401;
      next(err);
    }
  },
  api_route
);
// app.use("/api", api_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(`${err.status}: ${err.message}`);
});

module.exports = app;
