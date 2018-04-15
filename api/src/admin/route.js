const router = require('express').Router()
const q = require('../db/api/query')
const db = require('../db/api/connection')
const { isNullOrUndefined } = require('util')
const bcrypt = require('bcrypt')

router.get('/user/', async function(req, res) {
    const users = await q(db).user.getAll()
    res.json(users);
})

router.get('/user/:id', async function(req, res) {
    const user = await q(db).user.getById(req.params.id);
    res.json(user);
})

router.put('/user', function(req, res) {
    const user = req.body
    var salt = bcrypt.genSaltSync(16)
    var hash = bcrypt.hashSync(user.password, salt)
    user["salt"] = salt
    user["password"] = password
    return q(db).user.insert(insert)
})

router.put('/user/:id', function(req, res) {
    const ret = isNullOrUndefined(req.body.id) ? q(db).user.insert(req.body) : q(db).user.update(req.body)
    return res.json(ret)
})

router.put('/user/:id/password', function(req, res) {
    return q(db).user.updatePassword(req.params.id, req.body)
})

module.exports = router;