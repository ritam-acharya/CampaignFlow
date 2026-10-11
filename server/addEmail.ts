import emailQueue from "./config";

export async function addEmailInQueue(recipient: string, subject: string, content: string, campName: string) {
   const job = await emailQueue.add(
        "add job in the email-queue",
        {
            body: content,
            recipient,
            subject,
            campName
        },
        {
            attempts: 3,
            backoff: 5000
        }
    );

    console.log("Job added with an id: ", job.id);
}