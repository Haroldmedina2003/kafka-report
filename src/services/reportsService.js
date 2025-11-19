const reportRepository = require("../repositories/reportRepository");

exports.processComplaintStateChange = async (data) => {
  try {
    await reportRepository.SaveComplaintStateChangeReport(
      data.complaintId,
      data.complaintDescription,
      data.entityName,
      data.previousState,
      data.newState,
      data.changedBy,
      data.timestamp
    );
  } catch (error) {
    throw error;
  }
};

exports.getPaginatedReports = async (page, pageSize) => {
  try {
    const paginatedReports = await reportRepository.getPaginatedReports(
      page,
      pageSize
    );
    return paginatedReports;
  } catch (error) {
    throw error;
  }
};
