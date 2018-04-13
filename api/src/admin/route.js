let router = require('express').Router()
let q = require('../db/api/query')

router.get('/user/:id', function (req, res) {
  res.send(JSON.stringify({ id: "1", name: "sales", firstName: "John", lastName: "Sales" }))
})

router.put('/user/:id', function (req, res) {
  res.send(`About birds`)
})

module.exports = router;