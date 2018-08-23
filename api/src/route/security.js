const router = require("express").Router();
const q = require("../db/query");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");

//------------------------------------------------------------------------------

// USER - LIST
router.get("/user", async function(req, res) {
  var offset, limit;
  var { offset = 0, limit = 10 } = req.query;
  const users = await q(db).user.getAll(offset, limit);
  const total = await q(db).user.getAllCount();
  res.json({
    users: users,
    total: total.count
  });
});

// USER - CREATE
router.post("/user", async function(req, res, next) {
  const user = req.body;
  // check for usename duplicate. 
  // since it's not a transaction, it might cause race conditions.
  const exists = await q(db).user.exists(user.name);
  if (exists) {
    const e = new Error("Username already exists");
    e.status = 409;
    next(e);
  } else {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user["salt"] = salt;
    user["password"] = hash;
    const ret = await q(db).user.insert(user);
    res.json(ret);
  }
});

// USER - GET BY ID
router.get("/user/:id", async function(req, res) {
  const ret = await q(db).user.getById(req.params.id);
  res.json(ret);
});

// USER - UPDATE NAME
router.put("/user/:id", async function(req, res, next) {
  // check for usename duplicate. 
  // since it's not a transaction, it might cause race conditions.
  const exists = await q(db).user.exists(req.body.name);
  if (exists) {
    const e = new Error("Username already exists");
    e.status = 409;
    next(e);
  } else {
    const ret = await q(db).user.update(req.params.id, req.body);
    res.json(ret);
  }
});

// USER - DELETE
router.delete("/user/:id", async function(req, res) {
  const ret = await q(db).user.deleteById(req.params.id);
  res.json(ret);
});

// USER - UPDATE PASSWORD
router.put("/user/:id/password", async function(req, res) {
  const ret = await q(db).user.updatePassword(req.params.id, req.body.password);
  res.json(ret);
});

// USER - GROUPS
router.get("/user/:id/group", async function(req, res) {
  const ret = await q(db).user.groups(req.params.id);
  res.json(ret);
});

// USER - PERMISSIONS
router.get("/user/:id/permission", async function(req, res) {
  const ret = await q(db).user.permissions(req.params.id);
  res.json(ret.map(r => r.permission_id));
});

// USER - EXISTS?
router.get("/user/:name/exists", async function(req, res) {
  const ret = await q(db).user.exists(req.params.name);
  res.json(ret.count > 0);
});

//------------------------------------------------------------------------------

// GROUP - LIST
router.get("/group", async function(req, res) {
  var offset, limit;
  var { offset = 0, limit = 10 } = req.query;
  const groups = await q(db).group.getAll(offset, limit);
  res.json(groups);
});

// GROUP - GET BY ID
router.get("/group/:id", async function(req, res) {
  const ret = await q(db).group.getById(req.params.id);
  res.json(ret);
});

// GROUP - GET BY NAME
router.get("/group/name/:name", async function(req, res) {
  const ret = await q(db).group.getByName(req.params.name);
  res.json(ret);
});

// GROUP - CREATE
router.post("/group", async function(req, res) {
  const ret = await q(db).group.insert(req.body);
  res.json(ret);
});

// GROUP - UPDATE
router.put("/group/:id", async function(req, res) {
  const ret = await q(db).group.update(req.params.id, req.body);
  res.json(ret);
});

// GROUP - DELETE
router.delete("/group/:id", async function(req, res) {
  const ret = await q(db).group.deleteById(req.params.id);
  res.json(ret);
});

// GROUP - ADD USER
router.put("/group/:id/user/:userId", async function(req, res) {
  const ret = await q(db).group.addUser(req.params.id, req.params.userId);
  res.json(ret);
});

// GROUP - REMOVE USER
router.delete("/group/:id/user/:userId", async function(req, res) {
  const ret = await q(db).group.removeUser(req.params.id, req.params.userId);
  res.json(ret);
});

// GROUP - PERMISSIONS
router.get("/group/:id/permission", async function(req, res) {
  const ret = await q(db).group.permissions(req.params.id);
  res.json(ret.map(r => r.permission_id));
});

// GROUP - ADD PERMISSION
router.put("/group/:id/permission/:permissionId", async function(req, res) {
  const ret = await q(db).group.addPermission(
    req.params.id,
    req.params.permissionId
  );
  res.json(ret);
});

// GROUP - REMOVE PERMISSION
router.delete("/group/:id/permission/:permissionId", async function(req, res) {
  const ret = await q(db).group.removePermission(
    req.params.id,
    req.params.permissionId
  );
  res.json(ret);
});

//------------------------------------------------------------------------------

// PERMISSION - LIST
router.get("/permission", async function(req, res) {
  var offset, limit;
  var { offset = 0, limit = null } = req.query;
  const permissions = await q(db).permission.getAll(offset, limit);
  res.json(permissions);
});

module.exports = router;
