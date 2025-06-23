import Student from "../models/Student.js";
import { mockStudents } from "../db/students.mock.js";

export const getStudents = async (req, res, next) => {
  try {
    const count = await Student.countDocuments();
    if (count === 0) {
      console.log("Base de datos vacía. Insertando datos de ejemplo...");
      await Student.insertMany(mockStudents);
    }
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const { name, age, carrera, foto } = req.body;
    const newStudent = new Student({ name, age, carrera, foto });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};
