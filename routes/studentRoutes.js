// Houses all routes assosciated with /students
// ------------------------------------------------

const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

// Retrieve all students
router.get("/", studentController.all_students);
// Add student
router.post("/", studentController.add_student);
// Edit student name
router.put("/name/:id", studentController.edit_student_name);
// Change course within same institution
router.put("/course/:id", studentController.edit_course_only);
// Change course and institution
router.put("/institution/:id", studentController.edit_course_name);
// Delete student
router.delete("/:id", studentController.delete_student);

module.exports = router;
