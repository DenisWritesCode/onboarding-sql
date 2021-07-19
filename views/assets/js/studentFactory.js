app.factory("studentFactory", function ($http, $location, $window) {
  const baseUrl = "http://127.0.0.1:3000/students";

  const studentFactory = {
    getStudentDetails: function (id) {
      const url = `${baseUrl}/${id}`;

      const req = $http
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    addStudent: function (studentDetails) {
      const data = {
        name: studentDetails.student_name,
        course: studentDetails.course_name,
      };

      const course_id = studentDetails.course_id;
      const institution_id = studentDetails.institution_id;

      $http
        .post(baseUrl, data)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New student has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/course/${institution_id}/${course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "info",
            title: "Error!",
            text: err.data,
            showConfirmButton: true,
          });
        });
    },
    deleteStudent: function (id) {
      const url = `${baseUrl}/${id}`;

      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#085f00",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          $http
            .delete(url)
            .then((res) => {
              swal
                .fire({
                  title: "Success!",
                  text: "Student successfully deleted",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                })
                .then((result) => {
                  $window.location.reload(true);
                });
            })
            .catch((err) => {
              swal.fire({
                title: "Error!",
                text: err.data,
                icon: "error",
                button: "OK !",
              });
            });
        }
      });
    },
    editName: function (studentDetails) {
      const url = `${baseUrl}/name/${studentDetails.student_id}`;
      const data = {
        name: studentDetails.student_name,
      };

      $http
        .put(url, data)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New student name has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/course/${studentDetails.institution_id}/${studentDetails.course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "info",
            title: "Error!",
            text: err.data,
            showConfirmButton: true,
          });
        });
    },
    editCourseOnly: function (studentDetails) {
      const url = `${baseUrl}/course/${studentDetails.id}`;
      const course_name = studentDetails.subject_name;

      $http
        .put(url, { course_name })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New student course name has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/course/${studentDetails.institution_id}/${studentDetails.course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "info",
            title: "Error!",
            text: err.data,
            showConfirmButton: true,
          });
        });
    },
    editCourseInstitution: function (studentDetails) {
      const url = `${baseUrl}/institution/${studentDetails.student_id}`;
      const data = {
        course: studentDetails.course_name,
        institution: studentDetails.institution_name,
      };

      $http
        .put(url, data)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New student details saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/course/${studentDetails.institution_id}/${studentDetails.course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "info",
            title: "Error!",
            text: err.data,
            showConfirmButton: true,
          });
        });
    },
  };

  return studentFactory;
});
