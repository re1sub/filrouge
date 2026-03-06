import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// ─── Sécurité ─────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		message: { message: "Trop de requêtes, réessaie dans 15 minutes" },
	}),
);

// ─── Parsing ──────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
	res.json({ status: "ok tout va bien", timestamp: new Date().toISOString() });
});

app.get("/", (_req, res) => {
	res.send(`
    <h1>LA SYNTAXE C'EST IPMROTANT</h1>
    `);
});


app.use("/api/test/email", (req, res) => {
  const { email } = req.body;

	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	const testEmail = async () => {
		try {
			const info = await transporter.sendMail({
				from: `"Test" <${process.env.MAIL_FROM}>`,
				to: email,
				subject: "Test Email",
				text: "This is a test email!",
				html: "<h1>Test Email</h1><p>This is a test email!</p>",
			});
			console.log("✅ Email sent:", info.messageId);
		} catch (error) {
			console.error("❌ Error:", error.message);
		}
	};

	testEmail();
  
  res.json({ message: `Email sent to ${email}` });
});

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
	res.status(404).json({ message: "Route introuvable" });
});

// ─── Erreurs globales ─────────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
	console.error("Erreur serveur :", err);
	res.status(500).json({ message: "Erreur interne du serveur" });
});

export default app;
