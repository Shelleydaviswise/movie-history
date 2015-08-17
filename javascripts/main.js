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



requirejs( ["jquery", "lodash", "firebase", "hbs", "bootstrap", "getMovies", "addMovies", "bootstrap-rating"],
    function($, _, _firebase, Handlebars, bootstrap, get, add, rating) {

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

            require(
              ['hbs!../templates/wishlist'],
              function(movieTemplate){
                var populatedTemplate = movieTemplate({movies:FBMovie});
                console.log(FBMovie)
                console.log(populatedTemplate)
                $("#movie-list").append(populatedTemplate);
            });

            require(
              ['hbs!../templates/watched'],
              function(movieTemplate){
                var populatedTemplate = movieTemplate({movies:FBMovie});
                console.log(FBMovie)
                console.log(populatedTemplate)
                $("#movie-list").append(populatedTemplate);
                $('.rating').rating();
            });

            $("#titleInput").val('');
          });
        }); 

        $(document).on('click', "#addToWishlist", function(addevt){
            console.log("click", addevt);

            var addFB = $(this).parent().attr('key');
            add.addMovie(addFB);
            $(this).attr('disabled','disabled');
        });

        $(document).on('click', "#watchedButton", function(addevt){
            console.log("click", addevt);
            var watchedKey = $(this).parent().attr("key");
            var seenIt = new Firebase('https://movie-project.firebaseio.com/movies/' + watchedKey);
            if ( $(this).parent().attr("watched") === "false" ) {
                seenIt.update({'seen-it': true});
              } else {
                seenIt.update({'seen-it': false});
              }
        });

        //Delete Button
        $( document ).on( "click", "#deleteButton", function() {
          var titleKey = $(this).parent().attr("key");
          console.log("titleKey", titleKey);
          var fb = new Firebase('https://movie-project.firebaseio.com/movies/' + titleKey);
          fb.remove();
        });


       // // Watched Button
       //  $('#radio-watched').on('click', function(){
       //    var movieInput = $("#titleInput").val().toLowerCase();
       //    $(".movie-info").filter('[watched="false"]').hide();
       //    $(".movie-info").filter('[watched="true"]').show();
       //    $(".search-results").hide();
       //    $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
       //  });

       //  //Wish Button
       //  $('#radio-wish').on('click', function(){
       //    var movieInput = $("#titleInput").val().toLowerCase();
       //    $(".movie-info").filter('[watched="true"]').hide();
       //    $(".movie-info").filter('[watched="false"]').show();
       //    $(".search-results").hide();
       //    $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
       //  });

       //  // Add Button
       //  $('#radio-add').on('click', function(){
       //    var movieInput = $("#titleInput").val().toLowerCase();
       //    $(".movie-info").filter('[watched="false"]').hide();
       //    $(".movie-info").filter('[watched="true"]').hide();
       //    $(".search-results").show();
       //  });

        




      });

});    