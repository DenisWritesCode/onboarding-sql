// Houses all functions assosciated with /courses
// ------------------------------------------------

const db = require("./dbSetup");

// Get all courses
const all_courses = (req, res) => {
  const sql = "SELECT * FROM course";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Gets all courses from a specific school.
// Expects institution_id to be passed.
const all_courses_specific_school = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT course_name FROM course WHERE institution = ?";
  db.query(sql, id, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results);
    } else {
      res.send("Specified course has no students enrolled");
    }
  });
};

// Delete a specific course
// Expect course_id to be passed
const delete_course = (req, res) => {
  const id = req.params.id;

  const sql =
    "SELECT course.course_name AS subject, student.student_name AS student FROM course JOIN student ON course.course_id = student.course WHERE course_id = ?";

  db.query(sql, id, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // course has student
      res.send("Can't delete a course that has students enrolled");
    } else {
      // Course has no student and can be deleted
      const delete_sql = "DELETE FROM `course` WHERE course_id = ?";
      db.query(delete_sql, id, (err, resultDelete) => {
        if (err) throw err;
        res.send(resultDelete);
      });
    }
  });
};

// Add a course to an institution
// Can have {
// [
//     "course_name":"course2",
//     "institution": 1
// ],
// [
//     "course_name":"course2",
//     "institution": 2
// ]
const add_course = (req, res) => {
  const new_course_name = req.body.name; // Course to add
  const institution_id = req.body.id; // Institution to add it to

  // Check whether a similarly named course exists
  const sql = "SELECT * FROM course WHERE course_name = ? AND institution = ?";
  db.query(sql, [new_course_name, institution_id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // Such a course exists and we can't add a duplicate
      res.send("Can't have duplicate courses in the same institution");
    } else {
      // No such course exists and so we can add it
      const add_sql =
        "INSERT INTO `course`( `course_name`, `institution`) VALUES (?,?)";
      db.query(
        add_sql,
        [new_course_name, institution_id],
        (error, add_results) => {
          if (error) throw error;
          res.send(add_results);
        }
      );
    }
  });
};

// Edit course name
// Expects  course_id in the url, 
//          new_course_name in the body
//          institution_id in the body --> hidden field in the form.
const edit_course = (req, res) => {
  const course_id = req.params.id; // Course id to change
  const new_course_name = req.body.name; // New name to give to course
  const institution_id = req.body.institution_id; // Institution to add it to

  // Check whether that course name already exists in that institution
  const sql = "SELECT * FROM course WHERE course_name = ? AND institution = ?";
  db.query(sql, [new_course_name, institution_id], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // Such a course exists and we can't add a duplicate
      res.send("Can't have duplicate courses in the same institution");
    } else {
      const update_sql =
        "UPDATE `course` SET `course_name`=? WHERE `course_id` = ?";
      db.query(update_sql, [new_course_name, course_id], (err, update_result) => {
        if (err) throw err;
        res.send(update_result);
      });
    }
  });
};

module.exports = {
  all_courses,
  all_courses_specific_school,
  delete_course,
  add_course,
  edit_course,
};
