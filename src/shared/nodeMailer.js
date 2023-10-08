import nodemailer from "nodemailer";
import config from "../config/index.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "rumanislam0429@gmail.com",
    pass: "teqoczjtwcsqkjnw",
  },
});

export const sendForgotPasswordLink = async (email, token) => {
  const mailOptions = {
    from: "support@insignia.org",
    to: email,
    subject: "Your Insignia password",
    html: `<div style="width: 100%; padding: 20px 10px; font-size: 18px; font-weight: 400">
        <div style="width: 100%">
        <h3>Hello, ${email}:</h3>

        <p style="width: 100%; margin: 30px 0px">
          Please click on the link below <span  style="font-weight: 900">within 24 hours</span> to reset your Insignia password
        </p>

        <p style="width: 100%">
            <a
              target="_blank"
              href="${config.frontend_base_url}/reset-password/${token}"
              style="
                padding: 12px 8px;
                background-color: #348edb;
                color: #ffff;
                cursor: pointer;
                text-decoration: none;
              "
              >Reset your Password</a
            >
        </p>

        <p style="width: 100%; margin: 30px 0px">
          Once you reset your password, you will be signed in and able to enter the member-only area you tried to access.
        </p>
        </div>
        
        <p>Happy travels,</p>

        <div style="margin: 30px 0px">
        <p>The Insignia Support Team</p>
        <a target="_blank" href=${config.frontend_base_url}>${config.frontend_base_url}</a>
        </div>
      </div>`,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};
