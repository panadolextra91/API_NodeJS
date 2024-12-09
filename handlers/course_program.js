import { pool } from "../DB/index.js";

export const createCourseProgram = async (req, res) => {
    try {
        const { course_id, program_id, course_code, course_type_id } = req.body;

        // Validate required fields
        if (!course_id || !program_id || !course_code || !course_type_id) {
            return res.status(400).send('Missing required fields');
        }

        // Insert new course-program relationship
        await pool
            .promise()
            .query(
                'INSERT INTO course_program (course_id, program_id, course_code, course_type_id) VALUES (?, ?, ?, ?)',
                [course_id, program_id, course_code, course_type_id]
            );

        res.status(201).send('Course-Program relationship created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Course-Program relationship');
    }
};
export const getCoursesByProgram = async (req, res) => {
    try {
        const { program_id } = req.params;
        const { filter, sort } = req.query;

        let query = `
            SELECT cp.*, c.name AS course_name, p.name AS program_name 
            FROM course_program cp
            JOIN course c ON cp.course_id = c.id
            JOIN program p ON cp.program_id = p.id
            WHERE cp.program_id = ?
        `;
        const params = [program_id];

        // Apply filtering
        if (filter) {
            query += ' AND c.name LIKE ?';
            params.push(`%${filter}%`);
        }

        // Apply sorting
        if (sort) {
            query += ` ORDER BY ${sort}`;
        }

        const [rows] = await pool.promise().query(query, params);

        if (rows.length === 0) {
            return res.status(404).send('No courses found for the given program');
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving courses for the given program');
    }
};
export const deleteCourseProgram = async (req, res) => {
    try {
        const { course_id, program_id } = req.params;

        // Delete the course-program relationship
        const [result] = await pool
            .promise()
            .query(
                'DELETE FROM course_program WHERE course_id = ? AND program_id = ?',
                [course_id, program_id]
            );

        if (result.affectedRows === 0) {
            return res.status(404).send('Course-Program relationship not found');
        }

        res.status(200).send('Course-Program relationship deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting Course-Program relationship');
    }
};
