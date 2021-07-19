app.factory("institutionFactory", function ($http, $window) {
  const baseUrl = "http://127.0.0.1:3000/institutions";

  const institutionFactory = {
    getAllInstitutions: function () {
      const req = $http
        .get(baseUrl)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    getSingleInstitution: function (id) {
      const url = `${baseUrl}/${id}`;
      const req = $http
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    getInstitutionStudents: function (id) {
      const url = `${baseUrl}/students/${id}`;
      const req = $http
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

      return req;
    },
    addInstitution: function (institutionDetails) {
      const data = {
        name: institutionDetails.institution_name,
      };

      const req = $http
        .post(baseUrl, data)
        .then((res) => {
          swal.fire({
            title: "Success!",
            text: "Institution added successfully!",
            icon: "success",
            button: "Done !",
          });
          const url = `#!/institution`;
          $window.location.href = url;
        })
        .catch((err) => {
          swal.fire({
            title: "Error!",
            text: err.data,
            icon: "error",
            button: "OK !",
          });
        });

      return req;
    },
    updateInstitutionName: function (institutionDetails) {
      const url = `${baseUrl}/${institutionDetails.id}`;
      const data = {
        name: institutionDetails.name,
      };

      $http
        .put(url, data)
        .then((res) => {
          if (res.status === 200) {
            swal.fire({
              title: "Good job!",
              text: "Institution update successfully!",
              icon: "success",
              button: "Done !",
            });
            const url = `#!/institution`;
            $window.location.href = url;
          }
        })
        .catch((err) => {
          swal.fire({
            title: "Error!",
            text: err.data,
            icon: "error",
            button: "OK !",
          });
        });
    },
    deleteInstitution: function (id) {
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
              swal.fire({
                title: "Success!",
                text: "Institution successfully deleted",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(result => {

                $window.location.reload(true);
              })
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

  return institutionFactory;
});
