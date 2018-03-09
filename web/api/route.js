var router = require('express').Router();
var admin = require('./admin/route.js');

router.use('/admin', admin);

module.exports = router;