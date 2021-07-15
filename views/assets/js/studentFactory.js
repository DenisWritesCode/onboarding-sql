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

      $http
        .post(baseUrl, data)
        .then((res) => {
          if (res.status === 200) {
            const url = `#!/course/${studentDetails.course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => alert(err.data));
    },
    deleteStudent: function (id) {
      const url = `${baseUrl}/${id}`;
      
      $http
        .delete(url)
        .then((res) => {
          alert("Student deleted successfully");
          $window.location.reload(true);
        })
        .catch((err) => console.log(err));
    },
    editName : function(studentDetails) {
      const url = `${baseUrl}/name/${studentDetails.student_id}`;
      const data = {
        name: studentDetails.student_name,
      };

      $http.put(url, data).then((res) => {
        if (res.status === 200) {
          alert("successfully updated");
          const url = `#!/course/${studentDetails.course_id}`;
          $window.location.href = url;
        }
      }).catch(err => alert(err.data));
    },
    editCourseOnly: function (studentDetails) {
      const url = `${baseUrl}/course/${studentDetails.id}`;
      const course_name = studentDetails.subject_name;

      $http
        .put(url, { course_name })
        .then((res) => {
          if (res.status === 200) {
            const url = `#!/course/${studentDetails.course_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => console.log(err));
    },
    editCourseInstitution: function (studentDetails) {
      const url = `${baseUrl}/institution/${studentDetails.student_id}`;
      const data = {
        course: studentDetails.course_name,
        institution: studentDetails.institution_name,
      };

      $http.put(url, data).then((res) => {
        if (res.status === 200) {
          alert("successfully updated");
          const url = `#!/course/${studentDetails.course_id}`;
          $window.location.href = url;
        }
      }).catch(err => console.log(err.data));
    },
  };

  return studentFactory;
});
