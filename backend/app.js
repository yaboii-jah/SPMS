import dotenv from 'dotenv';
import mysql from 'mysql2'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release();
  }
});

app.post('/sample', (req, res) => {
    const { fname, lname, mname, department, supervisor, office_head, email } = req.body;

    const sql = "INSERT INTO users (first_name, last_name, middle_name, department, supervisor_division_chief, office_director, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [fname, lname, mname, department, supervisor, office_head, email], (err, result) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User added", id: result.insertId });
    });
});

export function start() {
    app.listen(3000, () => {
        console.log(`Listening at http://localhost`)
    })
}