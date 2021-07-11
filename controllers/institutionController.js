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

//Retrieve a single institution
const specific_institution = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM institution WHERE institution_id=?";
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.send(result);
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
      res.send("Institution name already taken");
    } else {
      // Insert new institution
      const insert = "INSERT INTO `institution`(`institution_name`) VALUES (?)";
      db.query(insert, name, (err, result) => {
        if (err) throw err;
        res.send(result);
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
      res.send("Institution name already taken");
    } else {
      const sql =
        "UPDATE `institution` SET `institution_name`=? WHERE institution_id=?";
      db.query(sql, [new_name, id], (err, result) => {
        if (err) throw err;
        res.send(result);
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
      res.send("Can't delete an institution that has a course attached to it");
    } else {
      // That institution has no courses thus can be deleted.
      const sql_delete = "DELETE FROM `institution` WHERE institution_id=?";
      db.query(sql_delete, id, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
  });
};

// Open all this niceness to the world
module.exports = {
  all_institutions,
  specific_institution,
  add_institution,
  update_institution,
  delete_institution,
};
