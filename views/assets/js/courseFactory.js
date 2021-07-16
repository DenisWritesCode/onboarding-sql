app.factory("courseFactory", function ($http, $window) {
  const baseUrl = "http://127.0.0.1:3000/courses";

  const courseFactory = {
    getAllCourses: function () {
      const req = $http
        .get(baseUrl)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    getCourseStudents: function (id) {
      const url = `${baseUrl}/${id}`;
      const req = $http
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    addCourse: function (courseDetails) {
      const data = {
        name: courseDetails.course_name,
        id: courseDetails.institution_id,
      };

      $http
        .post(baseUrl, data)
        .then((res) => {
          if (res.status === 200) {
            alert("Course added successfully");
            const url = `#!/institution/${courseDetails.institution_id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => alert(err.data));
    },
    updateCourseName: function (courseDetails) {
      const url = `${baseUrl}/${courseDetails.course_id}`;
      const data = {
          institution_id: courseDetails.id,
        name: courseDetails.name,
      };

      $http
        .put(url, data)
        .then((res) => {
          if (res.status === 200) {
            alert("successfully updated");
            const url = `#!/institution/${courseDetails.id}`;
            $window.location.href = url;
          }
        })
        .catch((err) => alert(err.data));
    },
    deleteCourse: function (id) {
      const url = `${baseUrl}/${id}`;

      $http
        .delete(url)
        .then((res) => {
          alert("Course deleted successfully");
          $window.location.reload(true);
        })
        .catch((err) => alert(err.data));
    },
  };

  return courseFactory;
});
