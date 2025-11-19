const express = require("express");
const router = express.Router();
const { getReportsPaginedList } = require("../controller/reportsController");

router.get("/", getReportsPaginedList);

module.exports = router;
