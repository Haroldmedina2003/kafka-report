const { getPaginatedReports } = require("../services/reportsService");

exports.getReportsPaginedList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const paginatedReports = await getPaginatedReports(page, pageSize);
    res.status(200).json(paginatedReports);
  } catch (error) {
    next(error);
  }
};
