require("dotenv").config();
const express = require("express");
const sequelize = require("./models").sequelize;
const { connectConsumer } = require("./kafka/consumer");
const reportsRoutes = require("./routes/reports.routes");
const logger = require("./utils/logger");
const port = process.env.PORT || 3003;

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok", time: new Date() }));
app.use("/reports", reportsRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully.");

    await connectConsumer();

    logger.info(`Reports service listening on port ${port}`);
  } catch (err) {
    logger.error(
      "Failed to start service: " + (err.stack || err.message || err)
    );
    process.exit(1);
  }
});
