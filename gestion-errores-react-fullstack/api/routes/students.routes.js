import { Router } from 'express';
import { getStudents, createStudent } from '../controllers/students.controller.js';

const router = Router();

router.get('/students', getStudents);
router.post('/students', createStudent);

export default router;
