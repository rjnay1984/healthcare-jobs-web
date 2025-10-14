import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  await transporter.sendMail({
    from: '"Healthcare Jobs" <noreply@healthcare-jobs.local>',
    to,
    subject,
    html,
  });
}
