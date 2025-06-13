import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
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