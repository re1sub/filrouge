import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	auth: {
		user: "a38cd0001@smtp-brevo.com",
		pass: "xsmtpsib-39612600e19495e9a5255e8596825ee2ccddd0b24a7b02a325962cd5a29743b0-Kt0o5lkQHnG4soAR",
	},
});

transporter
	.verify()
	.then(() => console.log("✅ SMTP connecté"))
	.catch((err) => console.warn("⚠️ SMTP non connecté :", err.message));

export default transporter;
