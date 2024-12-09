//handlers/index.js
import { pool } from '../DB/index.js';

export const getAllCourses = async (req, res) => {
    try {
        const { filter, sort } = req.query; // Query params for filtering and sorting
        let query = 'SELECT * FROM course';

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
        res.status(500).send('Error retrieving courses');
    }
};

export const getCourse = async (req, res) => {
    try {
        const { name } = req.params;
        const [rows] = await pool
            .promise()
            .query('SELECT * FROM course WHERE name = ?', [name]);

        if (rows.length === 0) {
            return res.status(404).send('Course not found');
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving course');
    }
};


export const createCourse = async (req, res) => {
    try {
        const { id, course_level_id, name, name_vn, credit_theory, credit_lab, description } = req.body;

        if (!id || !name || !credit_theory || !credit_lab) {
            return res.status(400).send('Missing required fields');
        }

        await pool
            .promise()
            .query(
                'INSERT INTO course (id, course_level_id, name, name_vn, credit_theory, credit_lab, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id, course_level_id, name, name_vn,  credit_theory, credit_lab, description]
            );

        res.status(201).send('Course created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating course');
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_level_id, name, name_vn,  credit_theory, credit_lab, description } = req.body;

        const [result] = await pool
            .promise()
            .query(
                'UPDATE course SET course_level_id = ?, name = ?, name_vn = ?, credit_theory = ?, credit_lab = ?, description = ? WHERE id = ?',
                [course_level_id, name, name_vn,  credit_theory, credit_lab, description, id]
            );

        if (result.affectedRows === 0) {
            return res.status(404).send('Course not found');
        }

        res.status(200).send('Course updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating course');
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool
            .promise()
            .query('DELETE FROM course WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).send('Course not found');
        }

        res.status(200).send('Course deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting course');
    }
};

