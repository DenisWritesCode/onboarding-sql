// Houses all functions assosciated with /student
// ------------------------------------------------

const db = require('./dbSetup');

// Get all students
// Expects the offset to be specified
const all_students = (req, res) => {
    const offset = req.body.offset;

    const sql = 'SELECT * FROM student LIMIT 10 OFFSET ?';
    db.query(sql, offset, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
};

// Add student & course -> If several courses with same name but different instituions exist then I do not know
const add_student = (req, res) => {
    const student_name = req.body.name;
    const course_name = req.body.course;

    // Make sure that course exists
    const sql = "SELECT course_name, course_id FROM course WHERE course_name = ?";
    db.query(sql, course_name, (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            // There is a course so we can place the student

            // Get the course id for use to store the student
            const course = result[0].course_id.toString();
            const add_sql = "INSERT INTO `student`( `student_name`, `course`) VALUES (?,?)";
            // Insert new student with their course
            db.query(add_sql, [student_name, course], (err, insert_result) => {
                if(err) throw err;
                res.send(insert_result);
            });
        } else {
            // No course. Tell user.
            res.send("Cannot add student to a non-existent course");
        }
    });


};

// Delete student
const delete_student = (req, res) => {
    const id = req.params.id; // ID of student to delete

    const sql = "DELETE FROM `student` WHERE student_id = ?";
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
};

// Edit student name
const edit_student_name = (req, res) => {

    const id = req.params.id;
    const new_name = req.body.name;

    // Assuming it will be impossible to edit the name of a student who doesn't exist already.
    const sql = "UPDATE `student` SET `student_name`=? WHERE student_id = ?";

    db.query(sql, [new_name, id], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
};

// Change the course of a student but remain in same uni
const edit_course_only = (req, res) => {
    // Use the same form but make institution field disabled.
    const id = req.params.id; // student_id to change course
    const new_course_name = req.body.course_name; // new course to enroll student

    // Make sure the new course exists in the same institution.
    const sql = "SELECT student.student_name, course.course_name, course.institution FROM student JOIN course ON student.course = course.course_id WHERE student.student_id = ?";

    db.query(sql, id, (err, result) => {
        if(err) throw err;

        // Get institution and check whether it has the new course
        const institution_id = result[0].institution.toString();
        const course_sql = "SELECT * FROM course WHERE institution = ? AND course_name = ?";
        db.query(course_sql, [institution_id, new_course_name], (error, course_res) => {
            if(error) throw error;

            if(course_res.length > 0) {
                // Means that new_course_name exists with a similar institution
                const course_id = course_res[0].course_id.toString(); 
                const update_sql = "UPDATE `student` SET `course`= ? WHERE student_id = ?";
                db.query(update_sql, [course_id, id], (update_course_err, update_course_res) => {
                    if(update_course_err) throw err;
                    res.send(update_course_res);
                });
                
            } else {
                res.send("The provided course doesn't exist in the student's current institution.");
            }
        });
    });
    
};

// Change the institution and course
const edit_course_name = (req, res) => {
    const student_id = req.params.id; // id of student to change
    const new_institution = req.body.institution; // institution to transfer student to
    const new_course = req.body.course; // course to transfer student to.

    // Confirm institution exists
    const sql = "SELECT * FROM institution WHERE institution_name = ?";
    db.query(sql, new_institution, (err, result) => {
        if(err) throw err;

        if(result.length > 0){
            // The new intended institution exists so we look for course
            const institution_id = result[0].institution_id.toString();
            const course_sql = "SELECT * FROM course WHERE course_name = ? AND institution = ?";
            db.query(course_sql, [new_course, institution_id], (error, course_result) => {
                if(error) throw error;

                if(course_result.length > 0) {
                    // course exists in the institution. Add student to that course
                    const course_id = course_result[0].course_id.toString();
                    const transfer_sql = "UPDATE `student` SET `course`=? WHERE student_id = ?";
                    db.query(transfer_sql, [course_id, student_id], (transfer_err, transfer_res) => {
                        if(transfer_err) throw transfer_err;
                        res.send(transfer_res);
                    });
                } else {
                    // institution exists but not course.
                    // TODO: The course may belong to a different institution.
                    res.send("The intended course for transfer does not exist in the provided institution");

                }
            });

        } else {
            // The new institution doesn't exist
            res.send("The intended institution for enrollment doesn't exist.");
        }
    });
    // Confirm course exists within institution
    // Add student
};


module.exports = {
    all_students,
    add_student,
    edit_student_name,
    edit_course_only,
    edit_course_name,
    delete_student
};