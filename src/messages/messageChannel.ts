import { config } from "dotenv";
import { Channel, connect } from "amqplib";

export const createMessageChannel = async (): Promise<Channel | null> => {
  config();

  const amqpServer = process.env.AMQP_SERVER;
  const queueName = process.env.QUEUE_NAME;

  if (!amqpServer || !queueName) {
    console.error("AMQP_SERVER or QUEUE_NAME environment variables are not set");
    return null;
  }

  try {
    const connection = await connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    return channel;
  } catch (err) {
    console.error("Error while trying to connect to RabbitMQ", err);
    return null;
  }
};
