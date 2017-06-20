
// create the module and name it scotchApp
angular.module('bookd8', ['ngRoute'])

// create the controller and inject Angular's $scope
  .controller('mainController', ($scope) => {
  // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
  })

  .config(($routeProvider) => {
    $routeProvider

    // route for the home page
      .when('/', {
        templateUrl: '/home.html',
        controller: 'mainController',
      })

    // route for the about page
      .when('/about', {
        templateUrl: '/about.html',
        controller: 'aboutController',
      })

    // route for the contact page
      .when('/contact', {
        templateUrl: '/contact.html',
        controller: 'contactController',
      });
  })


// create the controller and inject Angular's $scope
  .controller('mainController', ($scope) => {
  // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
  })
  .controller('aboutController', ($scope) => {
    $scope.message = 'Look! I am an about page.';
  })

  .controller('contactController', ($scope) => {
    $scope.message = 'Contact us! JK. This is just a demo.';
  });

