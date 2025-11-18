const { kafka } = require("./config");
const logger = require("../utils/logger");
const { processComplaintStateChange } = require("../service/reportService");

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
  setSessionTimeout: 30000,
  heartbeatInterval: 3000,
});

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: process.env.KAFKA_TOPIC,
    fromBeginning: true,
  });

  await consumer.run({
    autocommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value.toString();
        logger.info(`Received message on ${topic}: ${value}`);

        const event = JSON.parse(value);

        await processComplaintStateChange(event);

        await consumer.commitOffsets([
          {
            topic,
            partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);

        logger.info("Report saved successfully");
      } catch (err) {
        logger.error(
          "Error processing message: " + (err.stack || err.message || err)
        );
      }
    },
  });

  logger.info("Kafka consumer connected and running");
};

const disconnectConsumer = async () => {
  await consumer.disconnect();
  logger.info("Kafka consumer disconnected");
};

module.exports = { connectConsumer, disconnectConsumer };
