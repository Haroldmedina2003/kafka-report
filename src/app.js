require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const { connectConsumer } = require('./kafka/consumer');
const reportsRoutes = require('./routes/reports.routes');
const logger = require('./utils/logger');
const Report = require('./models/Report');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use('/reports', reportsRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected');

    
    await Report.sync();

    
    await connectConsumer();

    const port = process.env.PORT || 3003;
    app.listen(port, () => logger.info(`Reports service listening on port ${port}`));
  } catch (err) {
    logger.error('Failed to start service: ' + (err.stack || err.message || err));
    process.exit(1);
  }
};

start();
