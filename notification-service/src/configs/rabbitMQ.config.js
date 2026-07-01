import amqp from "amqplib";
import { handleNotificationEvent } from "../controllers/notificatin.controllers.js";

export const startConsumer = async () => {

  const connection = await amqp.connect("amqp://localhost");

  console.log("RabbitMQ Connected");

  const channel = await connection.createChannel();

  await channel.assertQueue(
    "notification_queue",
    { durable: true }
  );

  console.log("Waiting for messages...");

  channel.consume(
    "notification_queue",
    async (msg) => {

      if (!msg) return;

      try {

        const event = JSON.parse(
          msg.content.toString()
        );

        console.log("EVENT RECEIVED:", event);

        // Pass event to controller
        await handleNotificationEvent(event);

        // Acknowledge only after successful processing
        channel.ack(msg);

      } catch (error) {

        console.error(
          "RabbitMQ Consumer Error:",
          error
        );

        // Reject the message so it isn't requeued infinitely
        channel.nack(msg, false, false);
      }

    }
  );
};