import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, // your Gmail
      pass: process.env.EMAIL_PASSWORD, // app password
    },
  });

  const mailOptions = {
    from: `"RentLah" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    if (process.env.NODE_ENV === 'development') {
      console.log("📧 Email sent to:", to);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Error sending email:", error);
    }
    throw error;
  }
}