import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	secure: false,
	auth: {
		user: "a38cd0001@smtp-brevo.com",
		pass: "xsmtpsib-39612600e19495e9a5255e8596825ee2ccddd0b24a7b02a325962cd5a29743b0-ohicDFcGH8jKbCTN",
	},
});

const testEmail = async () => {
	try {
		const info = await transporter.sendMail({
			from: `"Test" <justsomedude060@gmail.com>`,
			to: "focirey987@keecs.com",
			subject: "Test Brevo Email",
			text: "This is a test email from Brevo!",
			html: "<h1>Test Email</h1><p>This is a test email from Brevo!</p>",
		});
		console.log("✅ Email sent:", info.messageId);
	} catch (error) {
		console.error("❌ Error:", error.message);
	}
};

testEmail();
