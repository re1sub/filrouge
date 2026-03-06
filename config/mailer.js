import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: 587,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

transporter
	.verify()
	.then(() => console.log("✅ SMTP connecté"))
	.catch((err) => console.warn("⚠️ SMTP non connecté :", err.message));

export default transporter;
