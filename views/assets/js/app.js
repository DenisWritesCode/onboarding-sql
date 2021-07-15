const app = angular.module("onboarding", ["ui.router"]);

// Establish the different views
app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/institution"); // Redirect for non-existent pages

    $stateProvider
      // Lists all the institutions
      .state("institution", {
        url: "/institution",
        templateUrl: "partials/institution/institution.html",
        resolve: {
          schools: function (institutionFactory) {
            return institutionFactory.getAllInstitutions();
          },
        },
        controller: function ($scope, schools, institutionFactory) {
          $scope.schools = schools;

          $scope.delete_institution = (institution_id) => {
            institutionFactory.deleteInstitution(institution_id);
          }
          
        },
      })
      // Adds a new institution
      .state("addInstitution", {
        url: "/addInstitution/",
        templateUrl: "partials/institution/institutionAdd.html",
        resolve: {
          // I don't think there is any data I need to load beforehand.
        },
        controller: function ($scope, institutionFactory) {
          $scope.institution = {
            institution_name:  "",
          };

          $scope.addInstitutionFunction = function () {
            institutionFactory.addInstitution($scope.institution);
          };
        },
      })
      // List all students in an institution
      .state("institutionListStudents", {
        url: "/institutionListStudents/:id",
        templateUrl: "partials/institution/listStudents.html",
        resolve: {
          students: function (institutionFactory, $stateParams) {
            return institutionFactory.getInstitutionStudents($stateParams.id);
          },
        },
        controller: function (students, $scope) {
          $scope.students = students;
          $scope.studentSearch = "";

          // Search
          $scope.sort = function(keyname){
            $scope.sortKey = keyname;   
            $scope.reverse = !$scope.reverse; 
        }
        },
      })
      // Edit the institution name
      .state("institutionEditName", {
        url: "/institutionEditName/:institution/:id",
        templateUrl: "partials/institution/editInstitutionName.html",
        resolve: {
          // I do not to load anything -> I'll get institution name from the $stateParams
        },
        controller: function ($stateParams, $scope, institutionFactory) {
          $scope.institution_name = $stateParams.institution;
          
          $scope.updateInstitutionName = function() {
            $scope.newInstitutionDetails = {
              name: $scope.institution_name,
              id: $stateParams.id
            };
            institutionFactory.updateInstitutionName($scope.newInstitutionDetails);
          }
        },
      })
      // Lists the courses in an institution
      .state("institutionDetails", {
        url: "/institution/:id",
        templateUrl: "partials/institution/institutionDetails.html",
        resolve: {
          courses: function (institutionFactory, $stateParams) {
            return institutionFactory.getSingleInstitution($stateParams.id);
          },
        },
        controller: function ($scope, courses, $stateParams, courseFactory) {
          $scope.courses = courses;

          $scope.deleteCourse = function(course_id) {
            courseFactory.deleteCourse(course_id);
          }
        },
      })
      // Edit the course name
      .state("courseEditName", {
        url: "/courseEditName/:course/:id/:course_id",
        templateUrl: "partials/course/editCourseName.html",
        resolve: {
          // I do not to load anything
        },
        controller: function ($stateParams, $scope, courseFactory) {
          $scope.course_name = $stateParams.course;
          
          $scope.updateCourseName = function() {
            $scope.newCourseDetails = {
              name: $scope.course_name,
              id: $stateParams.id,
              course_id: $stateParams.course_id
            };
            courseFactory.updateCourseName($scope.newCourseDetails);
          }
        },
      })
      // Lists the students enrolled in a course
      .state("courseDetails", {
        url: "/course/:id",
        templateUrl: "partials/course/courseDetails.html",
        resolve: {
          students: function (courseFactory, $stateParams) {
            return courseFactory.getCourseStudents($stateParams.id);
          },
        },
        controller: function ($scope, students, $stateParams, studentFactory) {
          $scope.students = students;                     
          $scope.course_id = $stateParams.id;

          $scope.delete = function (id) {
            studentFactory.deleteStudent(id);
          };

        },
      })
      // Add course to institution
      .state("addCourse", {
        url: "/addCourse/:institution/:id",
        templateUrl: "partials/course/courseAdd.html",
        resolve: {
          // I don't think there is any data I need to load beforehand.
        },
        controller: function ($scope, $stateParams, courseFactory) {
          $scope.course = {
            institution_id: $stateParams.id,
            institution_name: $stateParams.institution,
            course_name: "",
          };

          $scope.addCourseFunction = function () {
            courseFactory.addCourse($scope.course);
          };
        },
      })
      // Adds a new student
      .state("addStudent", {
        url: "/addStudent/:course/:id",
        templateUrl: "partials/student/studentAdd.html",
        resolve: {
          // I don't think there is any data I need to load beforehand.
        },
        controller: function ($scope, $stateParams, studentFactory) {
          $scope.student = {
            student_name: "",
            course_name: $stateParams.course,
            course_id: $stateParams.id,
          };

          $scope.addStudentFunction = function () {
            studentFactory.addStudent($scope.student);
          };
        },
      })
      // Edit a student's name
      .state("studentEditName", {
        url: "/studentEditName/:course/:id",
        templateUrl: "partials/student/studentEditName.html",
        resolve: {
          student: function (studentFactory, $stateParams) {
            return studentFactory.getStudentDetails($stateParams.id);
          },
        },
        controller: function ($scope, student, $stateParams, studentFactory) {
          $scope.newStudentDetails = {
            student_id : $stateParams.id,
            course_id : $stateParams.course,
            student_name: student[0].student_name,
          };

          $scope.editCourseInstitution = function(){
            studentFactory.editName($scope.newStudentDetails);
          };
        },
      })
      // Edits only the course of student
      .state("studentEditCourse", {
        url: "/student/:course/:id",
        templateUrl: "partials/student/studentEditCourse.html",
        resolve: {
          student: function (studentFactory, $stateParams) {
            return studentFactory.getStudentDetails($stateParams.id);
          },
        },
        controller: function ($scope, student, studentFactory, $stateParams) {
          $scope.newStudentDetails = {
            course_id: $stateParams.course,
            id: $stateParams.id,
            student: student[0].student_name,
            subject_name: student[0].course_name
          };

          $scope.updateCourse = function() {
            studentFactory.editCourseOnly($scope.newStudentDetails);
          }
        },
      })
      // Edits both the course & institution
      .state("studentEditCourseInstitution", {
        url: "/studentEdit/:course/:id",
        templateUrl: "partials/student/studentEditCourseInstitution.html",
        resolve: {
          student: function (studentFactory, $stateParams) {
            return studentFactory.getStudentDetails($stateParams.id);
          },
        },
        controller: function ($scope, student, $stateParams, studentFactory) {
          $scope.newStudentDetails = {
            student_id : $stateParams.id,
            course_id : $stateParams.course,
            student_name: student[0].student_name,
            course_name: student[0].course_name,
            institution_name : student[0].institution_name
          };

          $scope.editCourseInstitution = function(){
            studentFactory.editCourseInstitution($scope.newStudentDetails);
          };
        },
      });
  },
]);
