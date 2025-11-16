const Report = require('../models/Report');

exports.list = async (req, res) => {
  try {
    const reports = await Report.findAll({ order: [['processed_at', 'DESC']], limit: 100 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};
