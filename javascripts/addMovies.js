define(['jquery', 'firebase'], function($, _firebase) {
  return {
    addMovie: function(imdbID) {
      var ref = new Firebase("https://glaring-torch-7890.firebaseio.com/movie");
      $.ajax({
        url: "http://www.omdbapi.com/?i=" + imdbID
      }).done(function(data) {
        ref.child(data.Title.toLowerCase()).set({
          "title": data.Title.toLowerCase(),
          "actors": data.Actors,
          "year": data.Year,
          "seen-it": false,
          "rating": 0,
          "imdb": data.imdbID,
          "plot": data.Plot,
          "image-url": "http://img.omdbapi.com/?i=" + data.imdbID + "&apikey=8513e0a1"
        });
      });
    }
  };
});