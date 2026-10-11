
import { Worker, Job } from "bullmq";
import type { emailJobSchema } from "./type";
import { sendEmail } from "./sendEmail";

const redisConnection = {
  host: 'localhost',
  port: 6379,
};

const emailWorker = new Worker<emailJobSchema>(
    "email-worker",
    async (job: Job<emailJobSchema>) => {
        // @ts-ignore
        const {subject, recipient, body} = job;
        await sendEmail(recipient, body, subject);
    },
    {
        connection: redisConnection
    }
);

emailWorker.on("error", (reason) => {
    console.log("Job failed due to an error: ", reason);
});

console.log("Email service is running and waiting for email jobs...");