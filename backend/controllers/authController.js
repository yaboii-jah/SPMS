import { db } from '../connection/connection.js';

export function registerUser (req, res) {
    const { fname, lname, mname, department, supervisor, office_head, email } = req.body;

    const sql = "INSERT INTO users (first_name, last_name, middle_name, department, supervisor_division_chief, office_director, email) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [fname, lname, mname, department, supervisor, office_head, email], (err, result) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ message: "User added", id: result.insertId });
    });
}

export function logIn () {

}

export function logout () {

}