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



requirejs( ["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "addMovies"],
    function($, _, _firebase, Handlebars, bootstrap, get, add) {

      var tempMovies = {};
      var watchedMovies = {};
      var wishlistMovies = {};

        
      var myFirebaseRef = new Firebase("https://glaring-torch-7890.firebaseio.com/");
      myFirebaseRef.child("movie").on("value", function(snapshot) {
      var FBMovie = snapshot.val();

        $("#searchButton").click(function(evt){
          console.log(evt);

          get.getMovie(function(data) {
            tempMovies = data; 
          
            require(
              ['hbs!../templates/OMDB'],
              function(movieTemplate){ 
                var populatedTemplate = movieTemplate(tempMovies);
                $("#movie-list").html(populatedTemplate);
              }); 
            });
        });

        $("#addToWishlist").click(function(addevt){
              console.log(addevt);
              var addFB = $(this).parent().attr('key');
              add.addMovies(addFB);
              $(this).attr('disabled','disabled');

            require(
              ['hbs!../templates/wishlist'],
              function(movieTemplate){
                var populatedTemplate = movieTemplate(FBMovie);
                $("#movie-list").append(populatedTemplate);
            });

             $("#titleInput").val('');
        }); 

      });

});    
