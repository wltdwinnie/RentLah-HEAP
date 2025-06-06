import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});

const connectDB = async () => {
    try {
        await db.connect();
        console.log('Connected to PostgreSQL database');
        
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

connectDB();

export default db;