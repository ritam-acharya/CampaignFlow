import nodemailer, { type MailComposerOptions } from "nodemailer";
import { transporter } from "./transporter";
import type { MimeNodeAddressInput } from "nodemailer/lib/mime-node";

export async function sendEmail(recipient: MimeNodeAddressInput, content: MailComposerOptions, subject: string) {
    const info = await transporter.sendMail({
        from: '"Test Sender" <test@example.com>',
        to: recipient,
        subject: subject,
        html: content.html
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("Preview URL: ", previewUrl);
}
