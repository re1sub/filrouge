import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Only create database pool if environment variables are available
let pool = null;

if (
	process.env.DB_HOST &&
	process.env.DB_USER &&
	process.env.DB_PASSWORD &&
	process.env.DB_NAME
) {
	pool = mysql.createPool({
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT) || 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
		ssl: {
			rejectUnauthorized: false,
		},
		connectTimeout: 10000,
		timezone: "Z",
		charset: "utf8mb4",
	});

	// Only attempt connection in development, not in serverless functions
	if (process.env.NODE_ENV !== "production") {
		pool
			.getConnection()
			.then((conn) => {
				console.log("MySQL connecté");
				conn.release();
			})
			.catch((err) => {
				console.error("Erreur connexion MySQL :", err.message);
			});
	}
} else {
	console.log(
		"Database environment variables not found, running without database",
	);
}

export default pool;
