import amqp from "amqplib";

let channel;

export const connectRabbitMQ = async () => {
  try {

    const connection =
      await amqp.connect("amqp://localhost");


    channel =
      await connection.createChannel();


    await channel.assertQueue(
      "notification_queue",
      { durable: true }
    );

    console.log("RabbitMQ Connected");

  } catch (err) {
    console.error(
      "RabbitMQ Error:",
      err
    );
  }
};

export const getChannel = () => channel;