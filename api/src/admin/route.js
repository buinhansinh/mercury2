const router = require("express").Router();
const q = require("../db/query");
const db = require("../db/connection");
const { isNullOrUndefined } = require("util");
const bcrypt = require("bcrypt");

// gets a list of users
router.get("/user", async function(req, res) {
  var offset, limit;
  var { offset = 0, limit = 10 } = req.query;
  const users = await q(db).user.getAll(offset, limit);
  res.json(users);
});

// insert new user
router.put("/user", async function(req, res) {
  const user = req.body;
  var salt = bcrypt.genSaltSync(16);
  var hash = bcrypt.hashSync(user.password, salt);
  user["salt"] = salt;
  user["password"] = password;
  res.json(q(db).user.insert(insert));
});

// update name and displayname
router.put("/user/:id", async function(req, res) {
  const ret = q(db).user.update(req.params.id, req.body);
  res.json(ret);
});

// update password
router.put("/user/:id/password", async function(req, res) {
  res.json(q(db).user.updatePassword(req.params.id, req.body));
});

router.get("/user/exists/:name", async function(req, res) {
  const ret = await q(db).user.exists(req.params.name);
  res.json(ret.count > 0);
});

module.exports = router;
