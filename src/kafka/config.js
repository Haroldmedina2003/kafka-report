const { Kafka, logLevel } = require("kafkajs");

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "reports-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  logLevel: logLevel.INFO,
});

module.exports = { kafka };
