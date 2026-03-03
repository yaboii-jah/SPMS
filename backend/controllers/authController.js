import { db } from '../connection/connection.js';
import { errorResponse, successResponse } from '../utils/responseFormat.js';

export function registerUser (req, res) {
    const { fname, lname, mname, department, supervisor, office_head, email, password } = req.body;

    const sql = "INSERT INTO users (first_name, last_name, middle_name, department, supervisor_division_chief, office_director, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [fname, lname, mname, department, supervisor, office_head, email, password], (err, result) => {
        if (err) {
            return res.status(500).json(new errorResponse(false, err.message, err.code));
        }
            res.status().send(new successResponse(true, null, 'User Sucessfully Created'))
    });
}

export function logIn () {

}

export function logout () {

}