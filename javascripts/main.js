// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'bootstrap-rating': '../bower_components/bootstrap-rating/bootstrap-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


// The main function requiring all our anciliary scripts

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates", "bootstrap-rating"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template, bsrating){
  var myFirebaseRef = new Firebase("https://movie-history531.firebaseio.com/");
  var retrievedMoviesObj = {};
  var movie = {};
  var newMovie = {};
  myFirebaseRef.child("Movie").on("value", function(snapshot) {
    retrievedMoviesObj = snapshot.val();
    actorArrayMoviesObj = snapshot.val();
    for(var key in actorArrayMoviesObj) {
      actorArrayMoviesObj[key].actors = actorArrayMoviesObj[key].actors.split(", ");
    }
    $(".main").html(template.movie({Movie:actorArrayMoviesObj}));
    $('.rating').rating();
    $('.rating').on('change', function () {
        // Enter what needs to happen when rating is changed here!

      });

    var allMovies = $(".movie-sec");
    for(var i=0; i<allMovies.length; i++) {
      var thisMovieKey = $(allMovies[i]).attr("key");
      console.log("thisMovieKey", thisMovieKey);
      var isWatched = retrievedMoviesObj[thisMovieKey].watched;
      console.log("isWatched", isWatched);
      var $thisMovieWatchButton = $(allMovies[i]).find(".watchToggle");
      console.log("$thisMovieWatchButton", $thisMovieWatchButton);
      if(isWatched) {
        $thisMovieWatchButton.html("Watched");
        $thisMovieWatchButton.removeClass("btn-danger");
        $thisMovieWatchButton.addClass("btn-success");
      } else {
        $thisMovieWatchButton.html("Unwatched");
        $thisMovieWatchButton.removeClass("btn-success");
        $thisMovieWatchButton.addClass("btn-danger");
      }
    }
    require(
    ['hbs!../templates/modal'],
    function(modalTemplate){
      var populatedModal = modalTemplate({movie:poster});
      $("#modal-body").html(populatedTemplate);
      });     
    });

  });
  var show = function(showMovie) {
    movie = showMovie;
    console.log("movies", showMovie);
          
  //   newMovie.title = movie.Title;
  //   newMovie.poster = movie.Poster;
  //   console.log("newMovie", newMovie);

// $('#findMovieBtn').click(function() {
//     console.log("click");
//     var findMovie = $("#searchText").val();
//     console.log("searchText", findMovie);
//     $("#searchText").val("");
//     movies.getMovie(findMovie, show);

//   });


//Add Movie Button    

  // $('#addMoviebtn').click(function() {
  //   console.log("click");
  //   var addMovie = $("#addMovie").val();
  //   console.log("addMovie", addMovie);
  //   $("#addMovie").val("");
  //   movies.getMovie(addMovie, show);

  //    // $.ajax ({
  //   //   url: "https://movie-history531.firebaseio.com/Movie.json",
  //   //    method: "POST", 
  //   //    data: JSON.stringify(newMovie)
  //   //  }).done(function(NewType) {
  //   //    console.log("New Movie");
  //   //  });
  

  // });

  // Delete Movie Button (From Firebase)

  // $(document).on("click", ".del", function() {
  //   var movieKey = $(this).parents(".movie-sec").attr("key");
  //   myFirebaseRef.child("Movie").child(movieKey).set(null);
  // });

  // // Remove Movie Button (Not Firebase)

  // $(document).on("click", ".rmv", function() {
  //   $(this).parent().remove();
  //   console.log("confirmed remove button working");
  // });

//Radio bar for rating the movies

  // $("#range").on( "change", ".rating", function(e) {
  //   var movieKey = $(this).parents(".movie-sec").attr("key");
  //   var movieWithNewRating = retrievedMoviesObj[movieKey];
  //   movieWithNewRating.rating = $(this).val();
  //   myFirebaseRef.child("Movie").child(movieKey).set(movieWithNewRating);
  // });
    

  // $('#search').click(function() {
    
    
  //   var searchMovie = $('#searchText').val();
  //   $('#searchText').val("");

  //   console.log("search Movie", searchMovie);
  //   console.log("firebase obj",retrievedMoviesObj);

  //   var filteredMovies = {};
  //   filteredMovies = _.findKey(actorArrayMoviesObj, function(movie) {
  //     if (movie.title === searchMovie || movie.year === searchMovie) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });  

    
  //   console.log("filter", filteredMovies);
  //   console.log("actorArrayMoviesObj.filteredMovies", actorArrayMoviesObj[filteredMovies]);
  //   var finalFilteredMovie = {};
  //   finalFilteredMovie[filteredMovies] = actorArrayMoviesObj[filteredMovies];
  //   $(".main").html(template.movie({Movie:finalFilteredMovie}));

    
  // });

// Toggleclass button for watched/unwatched movies
//   $(document).on("click", ".watchToggle", function(e) {
//     e.preventDefault();
//     var movieKey = $(this).parents(".movie-sec").attr("key");
//     console.log("movieKey",movieKey);
//     var movieWithNewWatched = retrievedMoviesObj[movieKey];

//     console.log("movieWithNewWatched",movieWithNewWatched);

//     if(movieWithNewWatched.watched) {
//       movieWithNewWatched.watched = false;
//     } else {
//       movieWithNewWatched.watched = true;
//     }
//     myFirebaseRef.child("Movie").child(movieKey).set(movieWithNewWatched);
//   }); 
    
     
});
