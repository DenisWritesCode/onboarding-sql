// Houses all functions assosciated with /institution
const db = require("./dbSetup.js");

// Retrieve all institutions
const all_institutions = (req, res) => {
  const sql = "SELECT * FROM institution";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

//Retrieve a single institution's courses
const specific_institution = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT institution.institution_name, institution.institution_id, course.course_id, course.course_name FROM course JOIN institution ON course.institution = institution.institution_id WHERE institution_id=?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

// Retrieve all students enrolled in an institution
const all_institution_students = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT student.student_name, course.course_name, institution.institution_name FROM student INNER JOIN course ON student.course = course.course_id INNER JOIN institution ON course.institution = institution.institution_id WHERE institution.institution_id = ?";

  db.query(sql, id, (err, result) => {
    if(err) throw err;
    if(result.length > 0){
      // Institution has students enrolled
      res.send(result);
    } else {
      res.status(500).send("The selected institution has no students");
    }
  });
};

// Add an institution
const add_institution = (req, res) => {
  const name = req.body.name;

  // Check whether name exists
  const checkName = "SELECT * FROM institution WHERE institution_name=?";
  db.query(checkName, name.toString(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // Name already exists
      res.status(500).send("Institution name already taken");
    } else {
      // Insert new institution
      const insert = "INSERT INTO `institution`(`institution_name`) VALUES (?)";
      db.query(insert, name, (error, insert_result) => {
        if (error) throw error;
        res.send(insert_result);
      });
    }
  });
};

// Update an institution name
const update_institution = (req, res) => {
  const id = req.params.id;
  const new_name = req.body.name.toString();

  // Check whether name exists
  const checkName = "SELECT * FROM institution WHERE institution_name=?";
  db.query(checkName, new_name.toString(), (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // Name already exists
      res.status(500).send("Institution name already taken");
    } else {
      const sql =
        "UPDATE `institution` SET `institution_name`=? WHERE institution_id=?";
      db.query(sql, [new_name, id], (error, name_result) => {
        if (error) throw error;
        res.send(name_result);
      });
    }
  });
};

// Delete on institution
const delete_institution = (req, res) => {
  const id = req.params.id; // Institution_id to delete

  const sql =
    "SELECT institution.institution_name AS school, course.course_name AS subject FROM institution JOIN course ON institution.institution_id = course.institution WHERE institution_id = ?";

  db.query(sql, id, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // That institution has courses
      res.status(500).send("Can't delete an institution that has a course attached to it");
    } else {
      // That institution has no courses thus can be deleted.
      const sql_delete = "DELETE FROM `institution` WHERE institution_id=?";
      db.query(sql_delete, id, (error, delete_result) => {
        if (error) throw error;
        res.send(delete_result);
      });
    }
  });
};

// Open all this niceness to the world
module.exports = {
  all_institutions,
  specific_institution,
  all_institution_students,
  add_institution,
  update_institution,
  delete_institution,
};
