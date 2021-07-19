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
    getCoursesFromInstitution: function (id) {
      const url = `${baseUrl}/institution/${id}`;
      const req = $http
        .get(url)
        .then((res) => res.data)
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
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New course has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/institution/${courseDetails.institution_id}`;
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
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "New course name has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            const url = `#!/institution/${courseDetails.id}`;
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
    deleteCourse: function (id) {
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
                  text: "Course successfully deleted",
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
  };

  return courseFactory;
});
