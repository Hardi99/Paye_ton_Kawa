const amqp = require('amqplib');
require('dotenv').config

const connectToMessageBroker = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    
    // Add your RabbitMQ setup code here

  } catch (err) {
    console.error('Failed to connect to RabbitMQ', err);
  }
};

module.exports = connectToMessageBroker;
