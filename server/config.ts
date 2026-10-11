import { Queue } from "bullmq";
import type { emailJobSchema } from "./type";


const redisConnection = {
  host: 'localhost',
  port: 6379,
};

const emailQueue = new Queue<emailJobSchema>("email-worker", {
    connection: redisConnection
});

export default emailQueue;