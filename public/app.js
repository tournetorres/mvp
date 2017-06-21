
/* eslint prefer-arrow-callback: 0 */
const API_KEY = 'AIzaSyC6EuzVGkVlfuiyqR39eFB6XHlU3jM5dY4';
angular.module('bookd8', [])
  .controller('BookController', function BookController($scope, $http) {
    $scope.fetch = function (search) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&API_KEY=${API_KEY}&orderBy=relevance`;
      $http.get(url)
        .then((response) => {
          const bookCover = response.data.items;
          $scope.results = bookCover.map(el =>
            el);
        });
    };

    $scope.saveBook = function (result) {
      $http({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: '/library',
        method: 'POST',

        data: {
          title: result.volumeInfo.title,
        },

      })
        .then((response) => {
        // console.log(response);
          console.log('success');
        },
        (response) => { // optional
          console.log('fail');
        });
    };
    $scope.removeLastBook = function (result) {
      $http({
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: '/library',
        method: 'DELETE',

        data: {
          title: result.volumeInfo.title,
        },

      })
        .then((response) => {
          // console.log(response);
          console.log('success');
        },
        (response) => { // optional
          console.log('fail');
        });
    };
  });
