import nodemailer from "nodemailer";

type EmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailParams): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // HTML body content
  });

  console.log("Message sent: %s", info.messageId);
};
