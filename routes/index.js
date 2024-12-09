//routes/index.js
import { Router } from "express";
import { getAllCourses, createCourse, deleteCourse, updateCourse, getCourse } from '../handlers/index.js';
import { createProgram, getAllPrograms, getProgram, updateProgram, deleteProgram } from "../handlers/program.js";
import { createCourseProgram, getCoursesByProgram, deleteCourseProgram } from "../handlers/course_program.js";

const appRouter = Router();


//Course routes
appRouter.get('/course/', getAllCourses);
appRouter.get('/course/:name', getCourse);
appRouter.post('/course/create', createCourse);
appRouter.put('/course/update/:id', updateCourse);
appRouter.delete('/course/delete/:id', deleteCourse);


//Program routes
appRouter.get('/program/', getAllPrograms);
appRouter.get('/program/:name', getProgram);
appRouter.post('/program/create', createProgram);
appRouter.put('/program/update/:id', updateProgram);
appRouter.delete('/program/delete/:id', deleteProgram);

//Course_Program routes
appRouter.get('/course_program/:program_id', getCoursesByProgram);
appRouter.post('/course_program', createCourseProgram);
appRouter.delete('/course_program/:course_id/:program_id', deleteCourseProgram);

export default appRouter;