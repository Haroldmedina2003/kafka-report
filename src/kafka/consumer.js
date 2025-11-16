const { Kafka } = require('kafkajs');
const EVENTS = require('../config/constants');
const Report = require('../models/Report');
const logger = require('../utils/logger');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'reports-service',
  brokers: (process.env.KAFKA_BROKER || 'localhost:9092').split(',')
});

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'reports-group' });

const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: EVENTS.COMPLAINT_STATE_CHANGED, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value.toString();
        logger.info(`Received message on ${topic}: ${value}`);

        const event = JSON.parse(value);
        const messageKey = message.key ? message.key.toString() : null;

        
        if (messageKey) {
          const existing = await Report.findOne({ where: { message_key: messageKey } });
          if (existing) {
            logger.info(`Message with key ${messageKey} already processed — skipping`);
            return;
          }
        }

       
        await Report.create({
          complaint_id: event.complaint_id || null,
          previous_state: event.previous_state || null,
          new_state: event.new_state || null,
          changed_by: event.changed_by || null,
          payload: event,
          message_key: messageKey
        });

        logger.info('Report saved successfully');
      } catch (err) {
        logger.error('Error processing message: ' + (err.stack || err.message || err));
        
      }
    }
  });

  logger.info('Kafka consumer connected and running');
};

module.exports = { connectConsumer, consumer };
