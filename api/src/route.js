const router = require("express").Router();
const security = require("./route/security");
const company = require("./route/company");

router.use("/security", security);
router.use("/company", company);

module.exports = router;
