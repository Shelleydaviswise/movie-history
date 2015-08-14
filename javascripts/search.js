// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});


// The main function requiring all our anciliary scripts
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "templates"], 
  function($, _, _firebase, Handlebars, bootstrap, movies, template){
  var myFirebaseRef = new Firebase("https://refactor-movie-histo.firebaseio.com/");
  var fbMoviesObj = {};
  var omdbMoviesObj = {};
  
  myFirebaseRef.child("Movies").on("value", function(snapshot) {
    fbMoviesObj = snapshot.val();
      
  });

  $('#searchFBMovies').click(function() {
     console.log("You clicked search");
     console.log("firebase", fbMoviesObj);
    
    var searchFB = $('#searchText').val();
    $('#searchText').val("");

    console.log("search Movie", searchFB);

    var filteredFBMovies = {};
    for (var i = 0; i < fbMoviesObj.length; i++) {
      if (movie.title.contains(searchFB)) {
        filteredMovies[filteredMovies.length] = Movies[key];
      }
    }
  });

  $("#findMovies").click(function(evt){
          console.log(evt);
    ask.getMovies(function(movie) {
      omdbMoviesObj = movie; 
    });
    $("#searchText").val('');
  });
});



// $("#pickAlbum").on("click", ".album a", function(){
//         var chosenAlbum = $(this).parent().attr('value');
        
//           filterAlb.byAlbum(allSongsArray, chosenAlbum);
//       });
// var movie = {};
// var newMovie = {};

   // $(".main").html(template.movie({Movie:actorArrayMoviesObj}));
   //  var allMovies = $(".movie-sec");
   //  for(var i=0; i<allMovies.length; i++) {
   //    var thisMovieKey = $(allMovies[i]).attr("key");
   //    console.log("thisMovieKey", thisMovieKey);
   //    var isWatched = retrievedMoviesObj[thisMovieKey].watched;
   //    console.log("isWatched", isWatched);
   //    var $thisMovieWatchButton = $(allMovies[i]).find(".watchToggle");
   //    console.log("$thisMovieWatchButton", $thisMovieWatchButton);
   //    if(isWatched) {
   //      $thisMovieWatchButton.html("Watched");
   //      $thisMovieWatchButton.removeClass("btn-danger");
   //      $thisMovieWatchButton.addClass("btn-success");
   //    } else {
   //      $thisMovieWatchButton.html("Unwatched");
   //      $thisMovieWatchButton.removeClass("btn-success");
   //      $thisMovieWatchButton.addClass("btn-danger");
   //    }