const express = require('express');
const router = express.Router();

router.use("/", require("./user.router.js"));

module.exports = router;