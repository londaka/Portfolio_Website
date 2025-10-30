import nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password if using Gmail
  },
});

export const sendVerificationCode = async (email, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"CodeBySanjay" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Your verification code is:</p>
             <h2 style="color: blue;">${code}</h2>
             <p>This code is valid for 5 minutes.</p>`
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending error:", error.message);
  }
};
