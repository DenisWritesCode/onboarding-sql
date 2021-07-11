// Houses all routes assosciated with /courses
// ------------------------------------------------
const express = require("express");
const router = express.Router();

// Import the actual functions
const courseController = require('../controllers/courseController');

// Retrieve all courses
router.get('/', courseController.all_courses);
// Retrieve all courses for a specific course
router.get('/:id', courseController.all_courses_specific_school);
// Add a course
router.post('/', courseController.add_course);
// Update course name
router.put('/:id', courseController.edit_course);
// Delete a specific course
router.delete('/:id', courseController.delete_course);


module.exports = router;