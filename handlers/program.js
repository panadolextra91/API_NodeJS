//handlers/program.js
import { pool } from '../DB/index.js';


export const getAllPrograms = async (req, res) => {
    try {
        const { filter, sort } = req.query; // Query params for filtering and sorting
        let query = 'SELECT * FROM program';

        if (filter) {
            query += ` WHERE name LIKE '%${filter}%'`;
        }

        if (sort) {
            query += ` ORDER BY ${sort}`;
        }

        const [rows] = await pool.promise().query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving program');
    }
};

export const getProgram = async (req, res) => {
    try {
        const { name } = req.params;
        const [rows] = await pool
            .promise()
            .query('SELECT * FROM program WHERE name = ?', [name]);

        if (rows.length === 0) {
            return res.status(404).send('Program not found');
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving program');
    }
};

export const createProgram = async (req, res) => {
    try {
        const {id, name, duration, version, major_id, program_type_id, valid_from} = req.body;

        if (!id || !name || !duration || !version || !major_id || !program_type_id) {
            return res.status(400).send('Missing required fields');
        }

        await pool
        .promise()
        .query('INSERT INTO program (id, name, duration, version, major_id, program_type_id, valid_from) VALUES (?,?,?,?,?,?,?)', [id, name, duration, version, major_id, program_type_id, valid_from]
        );

        res.status(201).send('Program created successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Program created failed');
    };
};

export const updateProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration, version, major_id, program_type_id, valid_from } = req.body;

        // Update the program in the database
        const [result] = await pool
            .promise()
            .query(
                'UPDATE program SET name = ?, duration = ?, version = ?, major_id = ?, program_type_id = ?, valid_from = ? WHERE id = ?',
                [name, duration, version, major_id || null, program_type_id, valid_from || null, id]
            );

        // If no rows are affected, the program ID does not exist
        if (result.affectedRows === 0) {
            return res.status(404).send('Program not found');
        }

        res.status(200).send('Program updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating program');
    }
};
export const deleteProgram = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the program from the database
        const [result] = await pool.promise().query('DELETE FROM program WHERE id = ?', [id]);

        // If no rows are affected, the program ID does not exist
        if (result.affectedRows === 0) {
            return res.status(404).send('Program not found');
        }

        res.status(200).send('Program deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting program');
    }
};
