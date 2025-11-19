const db = require("../models");
const { paginate } = require("../interfaces/IPagination");

exports.SaveComplaintStateChangeReport = async (
  complaintId,
  complaintDescription,
  entityName,
  previousState,
  newState,
  userEmail,
  changeAt
) => {
  try {
    await db.ComplaintStateHistory.create({
      complaint_id: complaintId,
      complaint_description: complaintDescription,
      entity_name: entityName,
      previous_state: previousState,
      new_state: newState,
      user_email: userEmail,
      change_at: changeAt,
    });
  } catch (error) {
    console.error("Error saving complaint state change report:", error);
    throw error;
  }
};

exports.getPaginatedReports = async (page, pageSize) => {
  try {
    const paginatedResult = await paginate({
      model: db.ComplaintStateHistory,
      page,
      pageSize,
      options: {
        order: [["change_at", "DESC"]],
      },
    });
    return paginatedResult;
  } catch (error) {
    console.error("Error getting paginated reports:", error);
    throw error;
  }
};
