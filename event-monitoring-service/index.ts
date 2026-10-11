import { QueueEvents } from "bullmq";
import { WebSocketServer } from "ws";
import { redisConnection } from "./config";



const wss = new WebSocketServer({port: 8080});
const queueEvents = new QueueEvents(
    "email-worker",
    {
        connection: redisConnection
    }
);


wss.on("connection", (socket) => {
    queueEvents.on("waiting", ({ jobId }) => {
        // socket.send("Job added to the queue");
        console.log("Job added to the queue");
    });

    queueEvents.on('active', ({ jobId }) => {
        // socket.send("Worker picked up job. Sending...");
        console.log("Worker picked up job. Sending...");
    });

    queueEvents.on('completed', ({ jobId }) => {
        // socket.send("Email sent successfully!");
        console.log("Email sent successfully!");
    });

    queueEvents.on('failed', ({ jobId, failedReason }) => {
        // socket.send(`Attempt failed: ${failedReason}`);
        console.log(`Attempt failed: ${failedReason}`);
        
    });

});


