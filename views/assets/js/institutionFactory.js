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
    addInstitution: function (institutionDetails) {
      const data = {
        name: institutionDetails.institution_name,
      };

      const req = $http
        .post(baseUrl, data)
        .then((res) => {
          alert("Instution added successfully");
          const url = `#!/institution`;
          $window.location.href = url;
        })
        .catch((err) => alert(err.data));

      return req;
    },
    getInstitutionStudents: function (id){
      const url = `${baseUrl}/students/${id}`;
      const req = $http
        .get(url)
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));

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
            alert("successfully updated");
            const url = `#!/institution`;
            $window.location.href = url;
          }
        })
        .catch((err) => alert(err.data));
    },
    deleteInstitution: function (id) {
      const url = `${baseUrl}/${id}`;

      $http
        .delete(url)
        .then((res) => {
          alert("Institution deleted successfully");
          $window.location.reload(true);
        })
        .catch((err) => alert(err.data));
    },
  };

  return institutionFactory;
});
