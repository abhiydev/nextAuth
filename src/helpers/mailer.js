import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOption = {
      from: `"Abhishek Chedwal" <${process.env.SMTP_USER}>`,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}" target="_blank">
          here
        </a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }. or visit = ${process.env.DOMAIN}/${
          emailType === "VERIFY" ? "verifyemail" : "resetpassword"
        }?token=${hashedToken}
        </p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOption);

    // Log success message
    console.log(`Email sent successfully to ${email}`);
    console.log(`Message ID: ${mailResponse.messageId}`);

    return mailResponse;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
