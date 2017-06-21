

var API_KEY = 'AIzaSyC6EuzVGkVlfuiyqR39eFB6XHlU3jM5dY4';
angular.module('bookd8', [])
  .controller('BookController', function ($scope, $http) {

    $scope.results;
    $scope.fetch = function(search) {
      // console.log(search);
      var url = `https://www.googleapis.com/books/v1/volumes?q=${search}&API_KEY=${API_KEY}&orderBy=relevance`
      $http.get(url)
        .then((response) => {
          let bookCover = response.data.items;
          $scope.results = bookCover.map(function (el) {
            // console.log(el.volumeInfo.imageLinks)
            return el;
          })
        });
    };

      $scope.saveBook = function(result) {
      $http({
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
          url: '/library',
          method: "POST",

          "data": {
  "title": result.volumeInfo.title
}

      })
      .then(function(response) {
        // console.log(response);
            console.log("success");
      },
      function(response) { // optional
          console.log("fail");
      });
  }
});
